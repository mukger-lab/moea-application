import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict


class MatchingProcessor:
    def __init__(self, bert_processor):
        self.bert_processor = bert_processor


    def _find_best_semantic_level(self, discipline_vector: np.ndarray, levels: List[Dict]) -> int:
        valid_levels = [
            l for l in levels
            if l.get('description') and len(l.get('description', '').strip()) > 2
        ]

        if not valid_levels:
            return 1

        lvl_descs = [l['description'] for l in valid_levels]
        lvl_vectors = np.array(self.bert_processor.get_embeddings(lvl_descs))

        current_disc_vector = discipline_vector.reshape(1, -1)
        lvl_similarities = cosine_similarity(current_disc_vector, lvl_vectors)[0]

        best_lvl_idx = np.argmax(lvl_similarities)
        return int(valid_levels[best_lvl_idx].get('proficiencyLevel', 1))


    def _calculate_final_level(self, evidence_list: List[Dict]) -> int:
        if not evidence_list:
            return 1

        semantic_levels = [e['matchedLevel'] for e in evidence_list]
        avg_level = sum(semantic_levels) / len(semantic_levels)
        return round(avg_level)


    def match_disciplines(self, disciplines: List[Dict], competences: List[Dict], threshold: float) -> List[Dict]:
        if not disciplines or not competences:
            return []

        disc_titles = [d['title'] for d in disciplines]
        disc_vectors = np.array(self.bert_processor.get_embeddings(disc_titles))

        comp_texts = [c.get('description', '') for c in competences]
        comp_vectors = np.array(self.bert_processor.get_embeddings(comp_texts))

        similarity_matrix = cosine_similarity(disc_vectors, comp_vectors)

        grouped_results = {}

        for i, disc in enumerate(disciplines):
            sim_scores = similarity_matrix[i]
            best_match_idx = np.argmax(sim_scores)
            best_score = sim_scores[best_match_idx]

            if best_score < threshold:
                continue

            matched_comp = competences[best_match_idx]
            code = matched_comp.get('code')

            detected_level = self._find_best_semantic_level(
                discipline_vector=disc_vectors[i],
                levels=matched_comp.get('levels', [])
            )

            if code not in grouped_results:
                grouped_results[code] = {
                    "competence": {
                        "code": code,
                        "name": matched_comp.get('name'),
                        "calculatedLevel": 0
                    },
                    "evidence": []
                }

            grouped_results[code]["evidence"].append({
                "disciplineName": disc['title'],
                "score": disc['score'],
                "similarity": float(best_score),
                "matchedLevel": detected_level
            })

        final_output = []
        for code, data in grouped_results.items():
            data['competence']['calculatedLevel'] = self._calculate_final_level(data['evidence'])
            final_output.append(data)

        final_output.sort(key=lambda x: x['competence']['code'])

        return final_output

