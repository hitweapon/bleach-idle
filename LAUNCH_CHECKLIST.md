# XBleach — checklist de lançamento MVP

Atualizado em 29/10/2026.

## Implementado no código
- [x] Salvamento local separado entre visitante e cada ID de conta; o formato antigo é preservado como cópia e migrado para o espaço de visitante.
- [x] Carregamento remoto reconstrói o estado da conta, sem mesclar silenciosamente o estado de visitante.
- [x] Transferência de progresso de visitante para uma conta nova exige confirmação explícita.
- [x] Fila de salvamento remoto repete a gravação quando o estado muda durante uma operação em andamento.
- [x] Logout aguarda a confirmação do salvamento; se a nuvem falhar antes de carregar a conta, é possível sair sem enviar o progresso de visitante.
- [x] Reinício informa quando vai zerar a conta inteira e sincronizar a alteração para outros dispositivos.
- [x] Front-end de recuperação de senha: pedido por e-mail, formulário de nova senha, confirmação dos dois campos e atualização via Supabase Auth.
- [x] Três personagens selecionáveis: Ichigo Kurosaki, Uryū Ishida e Yoruichi Shihōin.
- [x] Arte própria para os três cards/personagens e alternância da arte principal de acordo com o personagem selecionado.
- [x] Habilidades iniciais exclusivas; os atalhos Q/W/E e a barra rápida acompanham o personagem escolhido.
- [x] Passivas de combate distintas por personagem.
- [x] Combate automático sem precisar pressionar um botão de ataque.
- [x] Doze habilidades cadastradas.
- [x] Quinze arquétipos de inimigos e seis bosses em rotação por vitórias.
- [x] Cinco zonas: Deserto Espiritual, Ruínas de Karakura, Floresta das Almas, Vale do Hollow e Sociedade das Almas.
- [x] Três armas novas, mais missões de progressão, bônus de classe e drops.
- [x] Simulação offline recalibrada para acompanhar a cadência do combate ativo e a velocidade escolhida.
- [x] Ranking online usando apenas nome público, nível, experiência e ouro do perfil.
- [x] Nomes públicos não são preenchidos com o prefixo do e-mail.
- [x] Navegação compacta e proporções móveis revisadas.
- [x] Validação estática de JavaScript, IDs e funções duplicadas, chaves CSS e referências de assets.
- [x] Supabase com RLS ligado nas tabelas de perfil e salvamento; políticas verificadas para que o jogador leia/escreva o próprio jogo. O SELECT de perfis públicos é permitido para o ranking.
- [x] Build da última versão confirmada como READY no Vercel.

## Testes manuais que ainda precisam ser feitos
- [ ] Abrir no iPhone e conferir a arena, o menu, os três personagens e a barra de habilidades.
- [ ] Abrir no desktop e verificar proporções, filtros, inventário e controles.
- [ ] Trocar entre os três personagens, recarregar a página e conferir que o personagem escolhido continua salvo.
- [ ] Deixar o combate AFK rodar; verificar HP dos inimigos, dano, uso de skills, XP, ouro, drops e mudança de zona.
- [ ] Avançar até os estágios de desbloqueio e derrotar cada boss; conferir recompensa e rotação.
- [ ] Exportar/importar o salvamento local e conferir que equipamentos e personagem são preservados.
- [ ] Criar duas contas de teste, confirmar salvamento/carregamento remoto e validar o ranking com dois perfis reais.
- [ ] Testar falha/offline da nuvem para garantir que o jogo continua jogável localmente.
- [ ] Testar recuperação de senha com conta real: receber o e-mail, abrir o link, definir senha nova e entrar de novo.
- [ ] Entrar em duas contas reais, alternar entre elas e verificar que cada uma restaura só o próprio progresso.
- [ ] Testar link de recuperação expirado/ inválido e confirmar uma mensagem útil sem expor se um e-mail está cadastrado.
- [ ] Testar login e cadastro em sessão limpa, incluindo confirmação de e-mail, erro de senha e rede indisponível.

## Validação automatizada realizada
- [x] Teste automatizado com Supabase simulado: isolamento entre contas, salvamento de visitante, transferência mediante confirmação, fila de sincronização e logout durante indisponibilidade da nuvem.
- [x] Sintaxe do JavaScript embutido validada com `node --check`.

## Bloqueios de configuração identificados
- [ ] **Acesso externo:** a proteção SSO do Vercel está habilitada para todos os domínios `.vercel.app`. O preview atual é READY, mas não deve ser considerado público; escolher um domínio/configuração acessível para testers antes de compartilhar.
- [ ] **Redirect de recuperação:** configurar a Site URL e Redirect URLs do Supabase Auth para o domínio público escolhido. A recuperação usa a origem atual do jogo; testar o link de e-mail no domínio final. Não adicionar wildcard amplo para todos os domínios `vercel.app`.
- [ ] Conferir os templates de e-mail do Supabase para que um redirect customizado use a URL de redirecionamento permitida, se aplicável.
- [ ] Fazer o teste com duas contas reais antes de marcar a sincronização como aprovada. Na consulta de 29/10/2026, `player_profiles` e `player_game_state` ainda estavam vazias.

## Antes de anunciar publicamente
- [ ] Confirmar direito/licença para distribuir personagens, nomes e universo de Bleach. Se não houver autorização, preparar uma versão com personagens e nomes originais antes de promover ou monetizar o jogo.
- [ ] Publicar política de privacidade e uma forma clara de solicitar exclusão de conta/dados, se o cadastro continuar habilitado.
- [ ] Verificar o comportamento de login, recuperação de senha e mensagens de erro em uma sessão de navegador limpa.

**Nota:** build pronta e validações de código não substituem a rodada de testes manuais acima. O ranking pode aparecer vazio até haver perfis que tenham sido salvos na nuvem.
