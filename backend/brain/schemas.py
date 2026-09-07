from ninja import ModelSchema, Schema
from typing import List
from .models import ActionProbability, AggiePhrase, BrainSetting, ChatCommand

class ActionProbabilitySchema(ModelSchema):
    class Meta:
        model = ActionProbability
        fields = ['action_name', 'weight', 'is_active']

class AggiePhraseSchema(ModelSchema):
    class Meta:
        model = AggiePhrase
        fields = ['category', 'text', 'weight', 'is_active']

class BrainSettingSchema(Schema):
    key: str
    value: float

class ChatCommandSchema(ModelSchema):
    class Meta:
        model = ChatCommand
        fields = ['name', 'keywords', 'event_type', 'reply_text', 'is_active']

class BrainConfigSchema(Schema):
    probabilities: List[ActionProbabilitySchema]
    phrases: List[AggiePhraseSchema]
    settings: List[BrainSettingSchema]
    commands: List[ChatCommandSchema]
