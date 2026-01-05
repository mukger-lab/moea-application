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


    def _pdf_to_image_list(self, pdf_content: bytes, dpi: int = 400) -> List[bytes]:
        images = []
        try:
            doc = fitz.open(stream=pdf_content, filetype="pdf")
            for page in doc:
                matrix = fitz.Matrix(dpi / 72, dpi / 72)
                pix = page.get_pixmap(matrix=matrix, alpha=False)
                ppm_bytes = pix.tobytes("ppm")
                pil_image = PILImage.open(BytesIO(ppm_bytes))
                output_buffer = BytesIO()
                pil_image.save(output_buffer, format="JPEG", quality=90)
                images.append(output_buffer.getvalue())
            return images
        except Exception as e:
            print(f"PDF conversion error: {e}")
            return []
        finally:
            if 'doc' in locals():
                doc.close()

    def process_pdf_in_memory(self, pdf_data_bytes: bytes) -> List[Dict]:
        images_bytes = self._pdf_to_image_list(pdf_data_bytes)
        if not images_bytes:
            return []

        prompt_text = (
            "Task: Systematically extract ALL standard academic courses and grades from EVERY provided image. "
            "Instructions for multi-image processing: "
            "1. Scan each image independently, row by row. "
            "2. Merge all findings into one continuous JSON array. "
            "3. Ensure no rows are skipped, especially at the bottom of one page or the top of the next. "

            "Data Extraction Rules: "
            "- 'discipline': Use the English title. If there is a '/' (e.g., Ukrainian/English), take the English part after the '/'. "
            "If only one language is present, translate it to English manually. "
            "- 'score': Extract only the numeric value (60-100). Ignore letters (A, B, C), ECTS, or 'Passed' text. "

            "STRICT FILTERING (Exclude these categories): "
                "1. EXCLUDE all qualification works: 'Bachelor's Thesis', 'Master's Thesis', 'Diploma Work', 'Thesis Defense'. "
                "2. EXCLUDE all course projects and term papers: 'Term Paper', 'Term Project', 'Course Work', 'Course Project'. "
                "3. EXCLUDE all administrative/final milestones: 'Final Certification', 'State Exam', 'Attestation', 'Total', 'GPA'. "
                "4. ABSOLUTELY EXCLUDE all types of practice and training: 'Pre-Diploma Training', 'Industrial Practice', 'Internship', 'Practical Training', 'Scientific Research Work'. "

            "Output Format: "
            "Return a clean JSON array of objects with 'discipline' and 'score' keys. "
            "If no academic records match these criteria, return []."
        )

        contents = [prompt_text]
        for image_data in images_bytes:
            contents.append(types.Part.from_bytes(data=image_data, mime_type="image/jpeg"))

        schema = types.Schema(
            type=types.Type.ARRAY,
            items=types.Schema(
                type=types.Type.OBJECT,
                properties={
                    "discipline": types.Schema(type=types.Type.STRING),
                    "score": types.Schema(type=types.Type.STRING)
                },
                required=["discipline", "score"]
            )
        )

        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=contents,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=schema,
                )
            )
            return json.loads(response.text.strip())
        except Exception as e:
            print(f"Processing error: {e}")
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

