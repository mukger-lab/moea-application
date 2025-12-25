from google import genai
from google.genai import types
from typing import List, Dict, Optional
import json
from io import BytesIO
import fitz
import os
from PIL import Image as PILImage

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GCP_PROJECT_ID = os.getenv("GCP_PROJECT_ID")
GCP_DOCAI_PROCESSOR_ID = os.getenv("GCP_DOCAI_PROCESSOR_ID")

class OcrProcessor:
    def __init__(self):
        if not GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY environment variable is not set.")

        try:
            self.client = genai.Client(api_key=GEMINI_API_KEY)
            self.model = 'gemini-2.5-flash'
            print(f"OcrProcessor initialized successfully.")
        except Exception as e:
            print(f"Error initializing OcrProcessor: {e}")
            raise


    def _pdf_to_image_bytes(self, pdf_content: bytes, dpi: int = 300) -> Optional[bytes]:
        try:
            doc = fitz.open(stream=pdf_content, filetype="pdf")
            if doc.page_count == 0:
                return None

            page = doc[0]
            matrix = fitz.Matrix(dpi / 72, dpi / 72)
            pix = page.get_pixmap(matrix=matrix, alpha=False)

            ppm_bytes = pix.tobytes("ppm")

            pil_image = PILImage.open(BytesIO(ppm_bytes))

            output_buffer = BytesIO()
            pil_image.save(output_buffer, format="JPEG", quality=90)

            return output_buffer.getvalue()

        except Exception as e:
            print(f"PDF conversion error: {e}")
            return None
        finally:
            if 'doc' in locals():
                doc.close()


    def process_pdf_in_memory(self, pdf_data_bytes: bytes) -> List[Dict]:
        image_bytes = self._pdf_to_image_bytes(pdf_data_bytes)
        mime_type = "image/jpeg"

        if image_bytes is None:
            return []

        try:
            image_data = types.Part.from_bytes(
                data=image_bytes,
                mime_type=mime_type
            )
        except Exception as e:
            print(f"Error preparing image data for API: {e}")
            return []

        prompt_text = (
            "Extract the full table of academic records from this image. "
            "Return the result as a clean JSON array where each object contains two keys: 'discipline' and 'score'. "
            "The 'discipline' value MUST be the English translation of the course title only (if the text contains a '/'"
            "separator, take the part after it; if not, translate the text manually.). The 'score' value MUST be the "
            "numeric mark (from 60 to 100), ignoring all textual and ECTS grades. Do not include totals. "
            "EXPLICITLY EXCLUDE any entries related to 'Diploma Thesis', 'Professional practice', 'Scientific Research Work', "
            "'Internship', 'Certification' etc. Only include standard taught courses. "
            "VALIDATION STEP: If the provided image is NOT a valid academic transcript containing a grade table, "
            "or if the image is unreadable, or if no valid coursework entries match the criteria, "
            "return strictly an empty JSON array: []."
        )

        schema = types.Schema(
            type=types.Type.ARRAY,
            items=types.Schema(
                type=types.Type.OBJECT,
                properties={
                    "discipline": types.Schema(type=types.Type.STRING,
                                               description="The English translation of the course title."),
                    "score": types.Schema(type=types.Type.STRING,
                                          description="The precise numeric score (e.g., 90, 75) for the course.")
                }
            )
        )

        response = self.client.models.generate_content(
            model=self.model,
            contents=[prompt_text, image_data],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=schema,
            )
        )

        try:
            json_str = response.text.strip()
            return json.loads(json_str)
        except json.JSONDecodeError as e:
            print(f"JSON Decode Error: {e}. Raw response: {response.text}")
            return []
        except Exception as e:
            print(f"Unexpected processing error: {e}")
            return []

    # -------------------------------------------------------------------------
    # EXPERIMENTAL: Google Cloud Document AI Implementation
    # -------------------------------------------------------------------------
    # NOTE: This method is deprecated in favor of Gemini Vision API.
    # While Document AI provides structured parsing, it requires complex
    # infrastructure setup (Processor creation, training, strict IAM roles),
    # which hinders the portability of this application.
    #
    # def _experimental_process_with_document_ai(self, image_bytes: bytes) -> List[Dict]:
    #     """
    #     Alternative implementation using Google Cloud Document AI (Form Parser).
    #     Requires 'google-cloud-documentai' package and active GCP Service Account.
    #     """
    #     # from google.cloud import documentai
    #     # from google.api_core.client_options import ClientOptions
    #
    #     # project_id = os.getenv("GCP_PROJECT_ID")
    #     # location = "us" # Format: 'us' or 'eu'
    #     # processor_id = os.getenv("GCP_DOCAI_PROCESSOR_ID")
    #
    #     # opts = ClientOptions(api_endpoint=f"{location}-documentai.googleapis.com")
    #     # client = documentai.DocumentProcessorServiceClient(client_options=opts)
    #     # name = client.processor_path(project_id, location, processor_id)
    #
    #     # raw_document = documentai.RawDocument(content=image_bytes, mime_type="image/jpeg")
    #     # request = documentai.ProcessRequest(name=name, raw_document=raw_document)
    #
    #     # try:
    #     #     result = client.process_document(request=request)
    #     #     # Parsing logic for Tables -> Rows -> Cells would go here
    #     #     return []
    #     # except Exception as e:
    #     #     print(f"Document AI processing failed: {e}")
    #     #     return []

