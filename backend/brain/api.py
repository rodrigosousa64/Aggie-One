from ninja import Router
from .models import ActionProbability, AggiePhrase, BrainSetting, ChatCommand
from .schemas import BrainConfigSchema

router = Router(tags=["Brain"])

@router.get("/config", response=BrainConfigSchema)
def get_brain_config(request):
    probabilities = ActionProbability.objects.filter(is_active=True)
    phrases = AggiePhrase.objects.filter(is_active=True)
    settings = BrainSetting.objects.all()
    commands = ChatCommand.objects.filter(is_active=True)
    
    return {
        "probabilities": list(probabilities),
        "phrases": list(phrases),
        "settings": list(settings),
        "commands": list(commands)
    }
