# XBleach — checklist de lançamento MVP

Atualizado em 27/10/2026.

## Implementado no código
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

## Antes de anunciar publicamente
- [ ] Confirmar direito/licença para distribuir personagens, nomes e universo de Bleach. Se não houver autorização, preparar uma versão com personagens e nomes originais antes de promover ou monetizar o jogo.
- [ ] Publicar política de privacidade e uma forma clara de solicitar exclusão de conta/dados, se o cadastro continuar habilitado.
- [ ] Verificar o comportamento de login, recuperação de senha e mensagens de erro em uma sessão de navegador limpa.

**Nota:** build pronta e validações de código não substituem a rodada de testes manuais acima. O ranking pode aparecer vazio até haver perfis que tenham sido salvos na nuvem.
