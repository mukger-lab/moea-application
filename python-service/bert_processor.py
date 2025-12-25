import torch
from transformers import AutoTokenizer, AutoModel
from typing import List

class BertProcessor:
    def __init__(self, model_name: str = 'bert-base-multilingual-cased'):
        self.model_name = model_name
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModel.from_pretrained(model_name)

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model.to(self.device)
        self.model.eval()

        self.vector_dim = self.model.config.hidden_size


    @staticmethod
    def _mean_pooling(last_hidden_states: torch.Tensor, attention_mask: torch.Tensor) -> torch.Tensor:
        last_hidden = last_hidden_states.masked_fill(~attention_mask[..., None].bool(), 0.0)
        sum_hidden = last_hidden.sum(dim=1)
        sum_mask = attention_mask.sum(dim=1).unsqueeze(-1)

        sum_mask = torch.clamp(sum_mask, min=1e-9)
        return sum_hidden / sum_mask


    @torch.no_grad()
    def get_embeddings(self, texts: List[str]) -> List[List[float]]:
        valid_texts = [text.strip() for text in texts if text and text.strip()]

        if not valid_texts:
            return []

        encoded_input = self.tokenizer(
            valid_texts,
            padding=True,
            truncation=True,
            max_length=128,
            return_tensors='pt'
        ).to(self.device)

        model_output = self.model(**encoded_input)

        sentence_embeddings = self._mean_pooling(
            model_output.last_hidden_state,
            encoded_input['attention_mask']
        )

        sentence_embeddings = torch.nn.functional.normalize(sentence_embeddings, p=2, dim=1)

        return sentence_embeddings.cpu().tolist()

