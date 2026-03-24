# Copilot Agent Context Storage

Este diretório armazena **contextos temporários** entre agentes na pipeline de implementação.
Cada arquivo é gerado por um agente e consumido pelo próximo na sequência.

## Fluxo de Dados

```
[1-analysis-output.md]
        ↓
[2-guidelines-output.md]
        ↓
[3-architecture-output.md]
        ↓
[4-planning-output.md]
        ↓
[5-refactoring-output.md]
        ↓
[6-testing-output.md]
```

## Instruções de Uso

- Cada agente **lê** os arquivos dos agentes anteriores antes de agir
- Cada agente **escreve** seu output no arquivo correspondente
- Os arquivos são substituídos a cada nova execução da pipeline
- Para preservar um estado, salve os arquivos com sufixo de data: `1-analysis-output-2026-03-03.md`
- Use o MCP `memory` para contextos que precisam persistir entre sessões

## Arquivos de Contexto

| Arquivo | Agente Responsável | Consumers |
|---|---|---|
| `1-analysis-output.md` | Code Analysis | Guidelines, Architecture, Planning |
| `2-guidelines-output.md` | Code Guidelines | Architecture, Planning, Refactoring |
| `3-architecture-output.md` | Web Architecture | Planning, Refactoring |
| `4-planning-output.md` | Implementation Planning | Refactoring, Testing |
| `5-refactoring-output.md` | Code Refactoring | Testing |
| `6-testing-output.md` | Testing | — (output final) |
| `session-metadata.md` | Workflow Master | Todos |
