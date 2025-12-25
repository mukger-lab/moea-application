import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, jsonify, request
from flask_cors import CORS
from typing import List, Dict

from bert_processor import BertProcessor
from ocr_processor import OcrProcessor
from matching_processor import MatchingProcessor

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "http://localhost:3001"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = {'pdf'}

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


try:
    bert_processor = BertProcessor(model_name='bert-base-multilingual-cased')
    ocr_processor = OcrProcessor()
    matching_processor = MatchingProcessor(bert_processor)
    print("AI Processors initialized successfully.")
except Exception as e:
    print(f"Error initializing AI processors: {e}")


@app.route('/api/bert/embed', methods=['POST'])
def get_text_embeddings():
    try:
        data = request.json
        texts = data.get('texts')

        if not texts or not isinstance(texts, list):
            return jsonify({'error': 'JSON field "texts" must be a non-empty list of strings.'}), 400

        embeddings = bert_processor.get_embeddings(texts)

        return jsonify(embeddings), 200

    except Exception as e:
        app.logger.error(f"BERT embedding failed: {e}")
        return jsonify({'error': 'Internal server error during embedding process.'}), 500


@app.route('/api/ocr/process', methods=['POST'])
def process_document_ocr():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        try:
            pdf_data_bytes = file.stream.read()

            ocr_results: List[Dict] = ocr_processor.process_pdf_in_memory(pdf_data_bytes)

            if not ocr_results:
                return jsonify({'error': 'OCR failed to extract data or no relevant tables found.'}), 500

            return jsonify({
                'status': 'success',
                'data': ocr_results,
                'count': len(ocr_results)
            }), 200

        except Exception as e:
            original_filename = file.filename
            app.logger.error(f"OCR processing failed for {original_filename}: {e}")
            return jsonify({'error': f'Internal server error during OCR processing: {e}'}), 500

    else:
        return jsonify({'error': f'File type not allowed. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}.'}), 400


@app.route('/api/analysis/match-competences', methods=['POST'])
def match_competences():
    try:
        req_data = request.json
        disciplines = req_data.get('disciplines', [])
        competences = req_data.get('competences', [])

        val = req_data.get('threshold')
        threshold = float(val) if val is not None else 0.65

        if not disciplines or not competences:
            return jsonify([])

        print(f"Analyzing {len(disciplines)} disciplines against {len(competences)} competences.")

        result = matching_processor.match_disciplines(disciplines, competences, threshold)

        return jsonify(result), 200

    except Exception as e:
        app.logger.error(f"Analysis failed: {e}")
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5001)