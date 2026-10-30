# XBleach — plano de teste beta

Data da revisão: 29/10/2026
Branch das mudanças: `fix/beta-save-sync`
Pull request: https://github.com/hitweapon/bleach-idle/pull/1

## Estado atual

- O fluxo de recuperação de senha está implementado no front-end com Supabase Auth: enviar solicitação, tratar o evento `PASSWORD_RECOVERY`, confirmar a nova senha e chamar `updateUser({ password })`.
- O JavaScript embutido passou na checagem sintática `node --check`.
- Os testes anteriores, com um cliente Supabase simulado, passaram para separação de contas, transferência de visitante, fila de salvamento e saída durante falha de rede.
- A resolução de conflito foi reforçada: a nuvem completa é a fonte de verdade por padrão; um salvamento local só ganha se carregar o marcador explícito de sincronização pendente. A comparação por timestamp local/remoto foi removida por poder favorecer um dispositivo antigo.
- A consulta às tabelas reais em 29/10/2026 encontrou zero linhas em `player_profiles` e `player_game_state`. Portanto, ainda não foi realizado teste com uma conta real existente.
- O Supabase Security Advisor não retornou findings de segurança. O Performance Advisor apontou cinco avisos `auth_rls_initplan` sobre a avaliação repetida de `auth.uid()`; são recomendações de desempenho, não erros de execução.
- O Vercel reporta o preview como `READY`, mas a proteção SSO está ativada para todos os domínios `vercel.app`. READY não significa que testadores externos consigam abrir o jogo.

## Bloqueios antes de convidar testers

1. Escolher um endereço de jogo acessível por quem está fora da equipe. Hoje o SSO do Vercel impede tratar o preview `vercel.app` como público. Não desativar a proteção da produção sem escolher conscientemente o domínio de beta.
2. Na configuração de Supabase Auth, definir a Site URL e permitir apenas os Redirect URLs necessários para o domínio de beta. A aplicação usa a origem atual como `redirectTo`; cada URL precisa corresponder à lista permitida.
3. Confirmar que o fluxo de e-mails do Supabase funciona (SMTP/templates/limites) no domínio escolhido. A tela de recuperação responde de forma genérica para não revelar se o e-mail existe; isso também significa que a resposta visual não prova que um e-mail foi enviado.
4. Depois de o domínio estar acessível, testar o e-mail real de recuperação e abrir o link em uma janela privada. O caminho de recuperação precisa ser acessível sem a autenticação SSO da equipe.

## Matriz de teste manual

### Conta e salvamento
- [ ] Criar a conta de teste A usando um e-mail acessível e concluir confirmação, se exigida.
- [ ] Jogar até obter nível, ouro, item, equipamento e estágio claramente distinguíveis; aguardar a indicação de salvamento na nuvem.
- [ ] Atualizar a página e entrar em outro dispositivo: o estado deve ser o mesmo.
- [ ] Criar/usar a conta B com progresso diferente; sair de A e entrar em B. B não pode herdar personagem, ouro, estágio ou inventário de A.
- [ ] Sair da B e voltar para A. O estado original de A deve reaparecer.
- [ ] Derrubar a conexão durante o jogo, continuar por alguns minutos e restaurar a conexão. Confirmar que a interface indica o estado real de sincronização e que o último estado acaba sendo enviado.
- [ ] Em dispositivo A, manter um save local já sincronizado e antigo; depois avançar a mesma conta no dispositivo B. Ao retornar em A, confirmar que a nuvem mais recente prevalece. Repetir com alterações locais marcadas como pendentes para confirmar que elas são reenviadas.
- [ ] Exportar/importar um save local e confirmar que a transferência não altera silenciosamente uma conta conectada.

### Recuperação de senha
- [ ] Na tela de login, informar o e-mail de uma conta de teste e escolher “Esqueci minha senha”.
- [ ] Verificar a caixa de entrada e spam; abrir o link em uma janela privada no domínio público de beta.
- [ ] Tentar enviar duas senhas diferentes; o jogo deve bloquear a atualização e explicar a divergência.
- [ ] Enviar uma senha válida com pelo menos 8 caracteres; a atualização deve ser confirmada e o novo login deve funcionar.
- [ ] Testar um link expirado/invalidado; a mensagem deve pedir um novo link, sem mostrar tokens.
- [ ] Para um e-mail sem conta, a interface não deve revelar se o cadastro existe.

### Jogo e acesso
- [ ] Abrir o endereço sem sessão do Vercel, em um browser limpo e num telefone fora da conta da equipe.
- [ ] Confirmar arena e menu no desktop e celular.
- [ ] Rodar combate AFK por duas horas: monitorar travamentos, FPS, contagem de recompensa duplicada e evolução de estágio.
- [ ] Testar velocidades 1×, 2× e 3×, cinco zonas e chefes.
- [ ] Confirmar ranking com dois perfis e checar se só são exibidos os campos públicos esperados.
- [ ] Verificar fluxo de exclusão de conta/dados antes de convidar o público; ainda não há fluxo público documentado no aplicativo.

## Modelo de relato de bug

- Plataforma/navegador:
- URL/domínio utilizado:
- Conta de teste (usar um identificador fictício, nunca divulgar e-mail completo):
- Passos para reproduzir:
- Resultado esperado:
- Resultado observado:
- Erros no console (remover tokens, e-mails e dados pessoais):
- O progresso foi perdido ou ficou duplicado?:
