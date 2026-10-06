# Critical Interfaces & Global Contracts

Core TypeScript types and database entity schemas powering WhatsApp CRM.

## Auth & Account Sharing (`src/lib/auth/roles.ts`, `src/types/index.ts`)
- `AccountRole`: `'owner' | 'admin' | 'agent' | 'viewer'` (rank hierarchy: owner 4, admin 3, agent 2, viewer 1).
- `Profile`: `{ id, user_id, full_name, email, role, beta_features?, account_id?, account_role?, created_at }`
- `Account`: `{ id, name, owner_user_id, created_at }`
- `AccountMember`: `{ id, account_id, user_id, role: AccountRole, created_at, profile?: Profile }`
- `AccountInvitation`: `{ id, account_id, email, role: AccountRole, invited_by, token, status, expires_at }`

## CRM & Contacts (`src/types/index.ts`)
- `Contact`: `{ id, account_id, phone, name, email?, avatar_url?, notes?, tags?: Tag[], custom_fields?: Record<string, string>, created_at }`
- `Conversation`: `{ id, account_id, contact_id, status: 'open' | 'pending' | 'closed', assigned_to?, last_message_at?, unread_count, contact?: Contact }`
- `Message`: `{ id, conversation_id, sender_type: 'customer' | 'agent' | 'bot', content_type: 'text' | 'image' | 'audio' | 'video' | 'document' | 'interactive' | 'template', content, status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed', whatsapp_message_id?, created_at }`
- `Pipeline`: `{ id, account_id, name, stages: PipelineStage[] }`
- `Deal`: `{ id, pipeline_id, stage_id, contact_id, title, value, currency, status: 'open' | 'won' | 'lost' }`

## WhatsApp & Messaging (`src/types/index.ts`, `src/lib/whatsapp/interactive.ts`)
- `WhatsAppConfig`: `{ id, account_id, phone_number_id, waba_id, access_token, webhook_verify_token, is_active }`
- `MessageTemplate`: `{ id, account_id, name, language, category, status, components }`
- `InteractiveMessagePayload`: Interactive list or button WhatsApp payload structures.

## Broadcasts & Automations (`src/types/index.ts`)
- `Broadcast`: `{ id, account_id, name, template_id, status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed', total_recipients, sent_count, failed_count }`
- `Automation`: `{ id, account_id, name, is_active, trigger_type, trigger_config, steps: AutomationStep[] }`
- `AutomationStep`: `{ id, automation_id, step_type, step_order, config: AutomationStepConfig }`

## Visual Flows (`src/lib/flows/types.ts`)
- `FlowNode`: Node types: `start`, `send_message`, `send_buttons`, `send_list`, `ask_question`, `condition`, `assign`, `tag`, `webhook`.
- `FlowRun`: Runtime execution record tracking active session state, variables, and step events.

## AI Assistant (`src/lib/ai/types.ts`)
- `AiConfig`: `{ provider: 'openai' | 'anthropic', model, apiKey, systemPrompt, isActive, autoReplyEnabled, autoReplyMaxPerConversation, handoffAgentId, embeddingsApiKey }`
- `ChatMessage`: `{ role: 'system' | 'user' | 'assistant', content }`
