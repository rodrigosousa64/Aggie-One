from django.contrib import admin
from .models import ActionProbability, AggiePhrase, BrainSetting, ChatCommand

@admin.register(ActionProbability)
class ActionProbabilityAdmin(admin.ModelAdmin):
    list_display = ('action_name', 'weight', 'is_active')
    list_editable = ('weight', 'is_active')
    search_fields = ('action_name',)
    list_filter = ('is_active',)

@admin.register(AggiePhrase)
class AggiePhraseAdmin(admin.ModelAdmin):
    list_display = ('category', 'text', 'weight', 'is_active')
    list_editable = ('weight', 'is_active')
    search_fields = ('category', 'text')
    list_filter = ('category', 'is_active')

@admin.register(BrainSetting)
class BrainSettingAdmin(admin.ModelAdmin):
    list_display = ('key', 'value', 'description')
    list_editable = ('value',)
    search_fields = ('key', 'description')

@admin.register(ChatCommand)
class ChatCommandAdmin(admin.ModelAdmin):
    list_display = ('name', 'keywords', 'event_type', 'is_active')
    list_editable = ('is_active',)
    search_fields = ('name', 'keywords', 'event_type')
    list_filter = ('event_type', 'is_active')
