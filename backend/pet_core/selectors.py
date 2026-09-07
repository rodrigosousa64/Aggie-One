from .models import PersonaTrait


def get_active_persona_context() -> str:
    """Monta o bloco de personalidade enviado ao LLM em toda interação."""
    traits = PersonaTrait.objects.filter(is_active=True).order_by("id")
    lines = []
    for trait in traits:
        description = (trait.description or "").strip()
        if description:
            lines.append(f"- {trait.trait_name}: {description}")
        else:
            lines.append(f"- {trait.trait_name}")
    return "\n".join(lines)
