# Modelo 3D Completo: Gaiola de Seguranca + Gabinete Eletrico Central
# Baseado na imagem de referencia profissional

import math
import os

# ============================
# CONFIGURACOES DIMENSIONAIS
# ============================

# GAIOLA DE SEGURANCA (amarela)
GAIOLA_LARGURA = 4400
GAIOLA_ALTURA = 3044
GAIOLA_PROFUNDIDADE = 3085

# GABINETE ELETRICO CENTRAL (cinza)
GABINETE_LARGURA = 1800
GABINETE_ALTURA = 1400
GABINETE_PROFUNDIDADE = 600
GABINETE_BASE_ALTURA = 180  # base elevada

# Posicionamento do gabinete (centralizado na gaiola)
GABINETE_X = (GAIOLA_LARGURA - GABINETE_LARGURA) / 2
GABINETE_Y = 0
GABINETE_Z = (GAIOLA_PROFUNDIDADE - GABINETE_PROFUNDIDADE) / 2

# Dimensoes das barras
ESPESSURA_BARRA_ESTRUTURAL = 60  # barras principais da gaiola
ESPESSURA_BARRA_GRADE = 15       # barras da grade
RAIO_BARRA_GRADE = 7.5

# Configuracao da grade da gaiola
ESPACAMENTO_GRADE_HORIZONTAL = 200
ESPACAMENTO_GRADE_VERTICAL = 150
ESPACAMENTO_GRADE_PROFUNDIDADE = 200

# Componentes do painel de controle
PAINEL_LARGURA = GABINETE_LARGURA * 0.6
PAINEL_X_OFFSET = GABINETE_LARGURA * 0.35

# Torre de sinalizacao
TORRE_RAIO = 40
TORRE_SEGMENTO_ALTURA = 80
TORRE_HASTE_ALTURA = 200

# Displays e botoes
DISPLAY_LARGURA = 200
DISPLAY_ALTURA = 150
BOTAO_RAIO = 15
SWITCH_LARGURA = 60
SWITCH_ALTURA = 100

# Porta de acesso
PORTA_LARGURA = 900
PORTA_ALTURA = 2000
# Porta centralizada na SEÇÃO CENTRAL (1085mm), não na gaiola inteira
SECAO_CENTRAL_INICIO = 1129  # início da seção central
SECAO_CENTRAL_LARGURA = 1085  # largura da seção central
PORTA_X_OFFSET = SECAO_CENTRAL_INICIO + (SECAO_CENTRAL_LARGURA - PORTA_LARGURA) / 2  # centralizada na seção
PORTA_Y_BASE = 0
PORTA_MARCO_ESPESSURA = 40

# Recuos laterais (seções conforme imagem)
RECUO_PROFUNDIDADE = 150  # quanto avança para dentro
RECUO_LARGURA = 60  # espessura da parede do recuo

# Recuos inferiores laterais (base recuada em "U" no centro)
RECUO_INFERIOR_ALTURA = 250  # altura do recuo inferior (degrau)
RECUO_INFERIOR_PROFUNDIDADE = 200  # largura do recuo lateral
# Recuo em "U" no CENTRO da profundidade (eixo Z)
RECUO_U_LARGURA_TOTAL = 1200  # largura total do "U" no centro (eixo Z)
RECUO_U_Z_INICIO = (GAIOLA_PROFUNDIDADE - RECUO_U_LARGURA_TOTAL) / 2  # centralizado em Z

# ============================
# SISTEMA DE VERTICES E FACES
# ============================
vertices = []
faces = []
v_idx = 1

grupos_materiais = {
    'gaiola_estrutura': [],      # estrutura principal amarela
    'gaiola_grade': [],          # grade amarela
    'gaiola_teto': [],           # teto da gaiola
    'gabinete_corpo': [],        # corpo do gabinete cinza
    'gabinete_base': [],         # base do gabinete
    'painel_controle': [],       # painel frontal
    'torre_verde': [],           # luz verde
    'torre_vermelha': [],        # luz vermelha
    'torre_haste': [],           # haste da torre
    'botoes_verdes': [],         # botoes indicadores verdes
    'botoes_vermelhos': [],      # botoes indicadores vermelhos
    'display': [],               # display HMI
    'switches': [],              # switches/disjuntores
    'porta': [],                 # porta de acesso
    'fechadura': [],             # fechadura/maçaneta
}

material_atual = 'gaiola_estrutura'

def add_vert(x, y, z):
    global v_idx
    vertices.append((x, y, z))
    v_idx += 1
    return v_idx - 1

def add_face(indices, material=None):
    global material_atual
    mat = material if material else material_atual
    if len(indices) >= 3:
        grupos_materiais[mat].append(('f', indices))

# ============================
# FUNCOES DE CRIACAO DE FORMAS
# ============================

def criar_caixa(x, y, z, dx, dy, dz, material=None):
    """Cria uma caixa retangular"""
    v1 = add_vert(x, y, z)
    v2 = add_vert(x+dx, y, z)
    v3 = add_vert(x+dx, y+dy, z)
    v4 = add_vert(x, y+dy, z)
    v5 = add_vert(x, y, z+dz)
    v6 = add_vert(x+dx, y, z+dz)
    v7 = add_vert(x+dx, y+dy, z+dz)
    v8 = add_vert(x, y+dy, z+dz)

    add_face([v1, v2, v3, v4], material)  # frente
    add_face([v5, v6, v7, v8], material)  # tras
    add_face([v1, v2, v6, v5], material)  # base
    add_face([v4, v3, v7, v8], material)  # topo
    add_face([v1, v4, v8, v5], material)  # esquerda
    add_face([v2, v3, v7, v6], material)  # direita

def criar_cilindro(x1, y1, z1, x2, y2, z2, raio, segmentos=8, material=None):
    """Cria um cilindro entre dois pontos"""
    dx, dy, dz = x2-x1, y2-y1, z2-z1
    comprimento = math.sqrt(dx*dx + dy*dy + dz*dz)

    if comprimento < 0.001:
        return

    dx, dy, dz = dx/comprimento, dy/comprimento, dz/comprimento

    if abs(dx) < 0.9:
        px, py, pz = 1, 0, 0
    else:
        px, py, pz = 0, 1, 0

    ux = py*dz - pz*dy
    uy = pz*dx - px*dz
    uz = px*dy - py*dx
    comp_u = math.sqrt(ux*ux + uy*uy + uz*uz)
    ux, uy, uz = ux/comp_u, uy/comp_u, uz/comp_u

    vx = dy*uz - dz*uy
    vy = dz*ux - dx*uz
    vz = dx*uy - dy*ux

    v_inicio = []
    v_fim = []

    for i in range(segmentos):
        angulo = 2 * math.pi * i / segmentos
        cos_a = math.cos(angulo)
        sin_a = math.sin(angulo)

        px1 = x1 + raio * (ux * cos_a + vx * sin_a)
        py1 = y1 + raio * (uy * cos_a + vy * sin_a)
        pz1 = z1 + raio * (uz * cos_a + vz * sin_a)
        v_inicio.append(add_vert(px1, py1, pz1))

        px2 = x2 + raio * (ux * cos_a + vx * sin_a)
        py2 = y2 + raio * (uy * cos_a + vy * sin_a)
        pz2 = z2 + raio * (uz * cos_a + vz * sin_a)
        v_fim.append(add_vert(px2, py2, pz2))

    for i in range(segmentos):
        i_next = (i + 1) % segmentos
        add_face([v_inicio[i], v_inicio[i_next], v_fim[i_next], v_fim[i]], material)

def criar_esfera(x, y, z, raio, segmentos_lat=8, segmentos_long=8, material=None):
    """Cria uma esfera"""
    verts_esfera = []

    for i in range(segmentos_lat + 1):
        theta = math.pi * i / segmentos_lat
        sin_theta = math.sin(theta)
        cos_theta = math.cos(theta)

        for j in range(segmentos_long):
            phi = 2 * math.pi * j / segmentos_long
            sin_phi = math.sin(phi)
            cos_phi = math.cos(phi)

            vx = x + raio * sin_theta * cos_phi
            vy = y + raio * cos_theta
            vz = z + raio * sin_theta * sin_phi

            verts_esfera.append(add_vert(vx, vy, vz))

    for i in range(segmentos_lat):
        for j in range(segmentos_long):
            j_next = (j + 1) % segmentos_long

            v1 = verts_esfera[i * segmentos_long + j]
            v2 = verts_esfera[i * segmentos_long + j_next]
            v3 = verts_esfera[(i + 1) * segmentos_long + j_next]
            v4 = verts_esfera[(i + 1) * segmentos_long + j]

            if i > 0:
                add_face([v1, v2, v3, v4], material)

def criar_porta_gradeada_rotacionada(x_dobradica, y_base, z_base, largura, altura, espessura_moldura, angulo_graus, material=None):
    """
    Cria uma porta GRADEADA rotacionada em torno de uma dobradiça
    x_dobradica: posição X da dobradiça (lado esquerdo da porta)
    angulo_graus: ângulo de abertura (positivo = abre para fora)
    """
    angulo_rad = math.radians(angulo_graus)
    cos_a = math.cos(angulo_rad)
    sin_a = math.sin(angulo_rad)
    
    # MOLDURA DA PORTA (estrutura externa)
    moldura_largura_barra = espessura_moldura
    
    # Função auxiliar para rotacionar e posicionar um ponto
    def rotacionar_ponto(x_local, y_local, z_local):
        x_rot = x_local * cos_a - z_local * sin_a
        z_rot = x_local * sin_a + z_local * cos_a
        return (x_dobradica + x_rot, y_base + y_local, z_base + z_rot)
    
    # MOLDURA ESQUERDA (lado da dobradiça)
    for y_offset in range(0, int(altura), 1):
        y_atual = y_offset
        if y_atual > altura:
            break
        x1, y1, z1 = rotacionar_ponto(0, y_atual, 0)
        x2, y2, z2 = rotacionar_ponto(0, y_atual + moldura_largura_barra, 0)
        x3, y3, z3 = rotacionar_ponto(moldura_largura_barra, y_atual + moldura_largura_barra, 0)
        x4, y4, z4 = rotacionar_ponto(moldura_largura_barra, y_atual, 0)
        
        x5, y5, z5 = rotacionar_ponto(0, y_atual, moldura_largura_barra)
        x6, y6, z6 = rotacionar_ponto(0, y_atual + moldura_largura_barra, moldura_largura_barra)
        x7, y7, z7 = rotacionar_ponto(moldura_largura_barra, y_atual + moldura_largura_barra, moldura_largura_barra)
        x8, y8, z8 = rotacionar_ponto(moldura_largura_barra, y_atual, moldura_largura_barra)
        
        v1 = add_vert(x1, y1, z1)
        v2 = add_vert(x2, y2, z2)
        v3 = add_vert(x3, y3, z3)
        v4 = add_vert(x4, y4, z4)
        v5 = add_vert(x5, y5, z5)
        v6 = add_vert(x6, y6, z6)
        v7 = add_vert(x7, y7, z7)
        v8 = add_vert(x8, y8, z8)
        
        add_face([v1, v2, v3, v4], material)
        add_face([v5, v6, v7, v8], material)
        add_face([v1, v2, v6, v5], material)
        add_face([v4, v3, v7, v8], material)
        add_face([v1, v4, v8, v5], material)
        add_face([v2, v3, v7, v6], material)
        y_offset += int(moldura_largura_barra * 0.8)
    
    # MOLDURA DIREITA
    for y_offset in range(0, int(altura), 1):
        y_atual = y_offset
        if y_atual > altura:
            break
        x1, y1, z1 = rotacionar_ponto(largura - moldura_largura_barra, y_atual, 0)
        x2, y2, z2 = rotacionar_ponto(largura - moldura_largura_barra, y_atual + moldura_largura_barra, 0)
        x3, y3, z3 = rotacionar_ponto(largura, y_atual + moldura_largura_barra, 0)
        x4, y4, z4 = rotacionar_ponto(largura, y_atual, 0)
        
        x5, y5, z5 = rotacionar_ponto(largura - moldura_largura_barra, y_atual, moldura_largura_barra)
        x6, y6, z6 = rotacionar_ponto(largura - moldura_largura_barra, y_atual + moldura_largura_barra, moldura_largura_barra)
        x7, y7, z7 = rotacionar_ponto(largura, y_atual + moldura_largura_barra, moldura_largura_barra)
        x8, y8, z8 = rotacionar_ponto(largura, y_atual, moldura_largura_barra)
        
        v1 = add_vert(x1, y1, z1)
        v2 = add_vert(x2, y2, z2)
        v3 = add_vert(x3, y3, z3)
        v4 = add_vert(x4, y4, z4)
        v5 = add_vert(x5, y5, z5)
        v6 = add_vert(x6, y6, z6)
        v7 = add_vert(x7, y7, z7)
        v8 = add_vert(x8, y8, z8)
        
        add_face([v1, v2, v3, v4], material)
        add_face([v5, v6, v7, v8], material)
        add_face([v1, v2, v6, v5], material)
        add_face([v4, v3, v7, v8], material)
        add_face([v1, v4, v8, v5], material)
        add_face([v2, v3, v7, v6], material)
        y_offset += int(moldura_largura_barra * 0.8)
    
    # MOLDURA SUPERIOR E INFERIOR
    for x_offset in range(0, int(largura), 1):
        x_atual = x_offset
        if x_atual > largura:
            break
        # Inferior
        x1, y1, z1 = rotacionar_ponto(x_atual, 0, 0)
        x2, y2, z2 = rotacionar_ponto(x_atual + moldura_largura_barra, 0, 0)
        x3, y3, z3 = rotacionar_ponto(x_atual + moldura_largura_barra, moldura_largura_barra, 0)
        x4, y4, z4 = rotacionar_ponto(x_atual, moldura_largura_barra, 0)
        
        x5, y5, z5 = rotacionar_ponto(x_atual, 0, moldura_largura_barra)
        x6, y6, z6 = rotacionar_ponto(x_atual + moldura_largura_barra, 0, moldura_largura_barra)
        x7, y7, z7 = rotacionar_ponto(x_atual + moldura_largura_barra, moldura_largura_barra, moldura_largura_barra)
        x8, y8, z8 = rotacionar_ponto(x_atual, moldura_largura_barra, moldura_largura_barra)
        
        v1 = add_vert(x1, y1, z1)
        v2 = add_vert(x2, y2, z2)
        v3 = add_vert(x3, y3, z3)
        v4 = add_vert(x4, y4, z4)
        v5 = add_vert(x5, y5, z5)
        v6 = add_vert(x6, y6, z6)
        v7 = add_vert(x7, y7, z7)
        v8 = add_vert(x8, y8, z8)
        
        add_face([v1, v2, v3, v4], material)
        add_face([v5, v6, v7, v8], material)
        add_face([v1, v2, v6, v5], material)
        add_face([v4, v3, v7, v8], material)
        add_face([v1, v4, v8, v5], material)
        add_face([v2, v3, v7, v6], material)
        
        # Superior
        x1, y1, z1 = rotacionar_ponto(x_atual, altura - moldura_largura_barra, 0)
        x2, y2, z2 = rotacionar_ponto(x_atual + moldura_largura_barra, altura - moldura_largura_barra, 0)
        x3, y3, z3 = rotacionar_ponto(x_atual + moldura_largura_barra, altura, 0)
        x4, y4, z4 = rotacionar_ponto(x_atual, altura, 0)
        
        x5, y5, z5 = rotacionar_ponto(x_atual, altura - moldura_largura_barra, moldura_largura_barra)
        x6, y6, z6 = rotacionar_ponto(x_atual + moldura_largura_barra, altura - moldura_largura_barra, moldura_largura_barra)
        x7, y7, z7 = rotacionar_ponto(x_atual + moldura_largura_barra, altura, moldura_largura_barra)
        x8, y8, z8 = rotacionar_ponto(x_atual, altura, moldura_largura_barra)
        
        v1 = add_vert(x1, y1, z1)
        v2 = add_vert(x2, y2, z2)
        v3 = add_vert(x3, y3, z3)
        v4 = add_vert(x4, y4, z4)
        v5 = add_vert(x5, y5, z5)
        v6 = add_vert(x6, y6, z6)
        v7 = add_vert(x7, y7, z7)
        v8 = add_vert(x8, y8, z8)
        
        add_face([v1, v2, v3, v4], material)
        add_face([v5, v6, v7, v8], material)
        add_face([v1, v2, v6, v5], material)
        add_face([v4, v3, v7, v8], material)
        add_face([v1, v4, v8, v5], material)
        add_face([v2, v3, v7, v6], material)
        
        x_offset += int(moldura_largura_barra * 0.8)
    
    # GRADE INTERNA (barras verticais e horizontais)
    raio_barra_interna = 8
    espacamento_grade = 120
    
    # Barras verticais internas
    x_barra = moldura_largura_barra + espacamento_grade
    while x_barra < largura - moldura_largura_barra:
        # Criar cilindro rotacionado
        x1, y1, z1 = rotacionar_ponto(x_barra, moldura_largura_barra, moldura_largura_barra/2)
        x2, y2, z2 = rotacionar_ponto(x_barra, altura - moldura_largura_barra, moldura_largura_barra/2)
        
        criar_cilindro(x1, y1, z1, x2, y2, z2, raio_barra_interna, segmentos=6, material=material)
        x_barra += espacamento_grade
    
    # Barras horizontais internas
    y_barra = moldura_largura_barra + espacamento_grade
    while y_barra < altura - moldura_largura_barra:
        x1, y1, z1 = rotacionar_ponto(moldura_largura_barra, y_barra, moldura_largura_barra/2)
        x2, y2, z2 = rotacionar_ponto(largura - moldura_largura_barra, y_barra, moldura_largura_barra/2)
        
        criar_cilindro(x1, y1, z1, x2, y2, z2, raio_barra_interna, segmentos=6, material=material)
        y_barra += espacamento_grade

# ============================
# CONSTRUCAO DO MODELO
# ============================

print("="*70)
print("CONSTRUINDO MODELO 3D: GAIOLA DE SEGURANCA + GABINETE ELETRICO")
print("="*70)

# ============================
# 1. GAIOLA DE SEGURANCA EXTERNA
# ============================

print("\n[1/7] Criando estrutura da gaiola de seguranca (azul)...")

material_atual = 'gaiola_estrutura'
e = ESPESSURA_BARRA_ESTRUTURAL

# Cantos verticais (4 pilares)
# Pilares frontais começam do chão (sem recuo inferior na frente)
criar_caixa(0, 0, 0, e, GAIOLA_ALTURA, e)
criar_caixa(GAIOLA_LARGURA-e, 0, 0, e, GAIOLA_ALTURA, e)

# Pilares traseiros também começam do chão
criar_caixa(0, 0, GAIOLA_PROFUNDIDADE-e, e, GAIOLA_ALTURA, e)
criar_caixa(GAIOLA_LARGURA-e, 0, GAIOLA_PROFUNDIDADE-e, e, GAIOLA_ALTURA, e)

# Barras horizontais base (frontal e traseira)
criar_caixa(0, 0, 0, GAIOLA_LARGURA, e, e)
criar_caixa(0, 0, GAIOLA_PROFUNDIDADE-e, GAIOLA_LARGURA, e, e)

# Barras horizontais base LATERAIS - começam acima do recuo
# (a parte inferior das laterais fica recuada)
criar_caixa(0, RECUO_INFERIOR_ALTURA, 0, e, e, GAIOLA_PROFUNDIDADE)
criar_caixa(GAIOLA_LARGURA-e, RECUO_INFERIOR_ALTURA, 0, e, e, GAIOLA_PROFUNDIDADE)

# Barras horizontais topo
criar_caixa(0, GAIOLA_ALTURA-e, 0, GAIOLA_LARGURA, e, e)
criar_caixa(0, GAIOLA_ALTURA-e, GAIOLA_PROFUNDIDADE-e, GAIOLA_LARGURA, e, e)
criar_caixa(0, GAIOLA_ALTURA-e, 0, e, e, GAIOLA_PROFUNDIDADE)
criar_caixa(GAIOLA_LARGURA-e, GAIOLA_ALTURA-e, 0, e, e, GAIOLA_PROFUNDIDADE)

# Barras horizontais intermediarias (1137mm e 1807mm)
# IMPORTANTE: Essas barras devem ser cortadas na área da porta
for altura in [1137, 1807]:
    # Barras frontais DIVIDIDAS (cortadas na área da porta)
    # Barra frontal esquerda (até o batente esquerdo da porta)
    criar_caixa(0, altura-e/2, 0, PORTA_X_OFFSET - PORTA_MARCO_ESPESSURA, e, e)
    
    # Barra frontal direita (após o batente direito da porta)
    criar_caixa(PORTA_X_OFFSET + PORTA_LARGURA + PORTA_MARCO_ESPESSURA, altura-e/2, 0, 
                GAIOLA_LARGURA - (PORTA_X_OFFSET + PORTA_LARGURA + PORTA_MARCO_ESPESSURA), e, e)
    
    # Barra traseira completa
    criar_caixa(0, altura-e/2, GAIOLA_PROFUNDIDADE-e, GAIOLA_LARGURA, e, e)
    
    # Barras laterais começam após o recuo inferior (em z=RECUO_INFERIOR_PROFUNDIDADE)
    criar_caixa(0, altura-e/2, RECUO_INFERIOR_PROFUNDIDADE, e, e, GAIOLA_PROFUNDIDADE - 2*RECUO_INFERIOR_PROFUNDIDADE)
    criar_caixa(GAIOLA_LARGURA-e, altura-e/2, RECUO_INFERIOR_PROFUNDIDADE, e, e, GAIOLA_PROFUNDIDADE - 2*RECUO_INFERIOR_PROFUNDIDADE)

# TETO DA GAIOLA
material_atual = 'gaiola_teto'

# Grade do teto (barras entrecruzadas)
print("[2/7] Criando teto da gaiola...")

# Barras do teto no sentido da largura
x = 0
while x <= GAIOLA_LARGURA:
    criar_cilindro(x, GAIOLA_ALTURA, 0, x, GAIOLA_ALTURA, GAIOLA_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6, material='gaiola_teto')
    x += ESPACAMENTO_GRADE_HORIZONTAL

# Barras do teto no sentido da profundidade
z = 0
while z <= GAIOLA_PROFUNDIDADE:
    criar_cilindro(0, GAIOLA_ALTURA, z, GAIOLA_LARGURA, GAIOLA_ALTURA, z, RAIO_BARRA_GRADE, segmentos=6, material='gaiola_teto')
    z += ESPACAMENTO_GRADE_PROFUNDIDADE

print("[3/7] Criando grade metalica das paredes com porta de acesso...")

material_atual = 'gaiola_grade'

# Grade frontal COM RECUOS e PORTA DE ACESSO
# Posições das seções
secao_1_largura = 1129  # seção esquerda
secao_2_largura = 1085  # seção central (com porta, recuada)
divisor_1_x = secao_1_largura
divisor_2_x = secao_1_largura + secao_2_largura

# GRADE DA SEÇÃO ESQUERDA (z=0, sem recuo)
# Barras verticais
x = 0
while x <= divisor_1_x:
    criar_cilindro(x, 0, 0, x, GAIOLA_ALTURA, 0, RAIO_BARRA_GRADE, segmentos=6)
    x += ESPACAMENTO_GRADE_HORIZONTAL

# Barras horizontais
y = 0
while y <= GAIOLA_ALTURA:
    criar_cilindro(0, y, 0, divisor_1_x, y, 0, RAIO_BARRA_GRADE, segmentos=6)
    y += ESPACAMENTO_GRADE_VERTICAL

# GRADE DA SEÇÃO DIREITA (z=0, sem recuo)
# Barras verticais
x = divisor_2_x
while x <= GAIOLA_LARGURA:
    criar_cilindro(x, 0, 0, x, GAIOLA_ALTURA, 0, RAIO_BARRA_GRADE, segmentos=6)
    x += ESPACAMENTO_GRADE_HORIZONTAL

# Barras horizontais
y = 0
while y <= GAIOLA_ALTURA:
    criar_cilindro(divisor_2_x, y, 0, GAIOLA_LARGURA, y, 0, RAIO_BARRA_GRADE, segmentos=6)
    y += ESPACAMENTO_GRADE_VERTICAL

# GRADE DA SEÇÃO CENTRAL RECUADA (z=RECUO_PROFUNDIDADE, com porta)
# Barras verticais (evitando área da porta)
x = divisor_1_x
while x <= divisor_2_x:
    # Se estiver na área da porta, pular ou criar apenas acima
    if x < PORTA_X_OFFSET or x > (PORTA_X_OFFSET + PORTA_LARGURA):
        criar_cilindro(x, 0, RECUO_PROFUNDIDADE, x, GAIOLA_ALTURA, RECUO_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
    else:
        # Criar apenas as barras acima da porta
        if PORTA_ALTURA < GAIOLA_ALTURA:
            criar_cilindro(x, PORTA_ALTURA, RECUO_PROFUNDIDADE, x, GAIOLA_ALTURA, RECUO_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
    x += ESPACAMENTO_GRADE_HORIZONTAL

# Barras horizontais (evitando área da porta)
y = 0
while y <= GAIOLA_ALTURA:
    if y < PORTA_ALTURA:
        # Barra esquerda da porta
        criar_cilindro(divisor_1_x, y, RECUO_PROFUNDIDADE, PORTA_X_OFFSET, y, RECUO_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
        # Barra direita da porta
        criar_cilindro(PORTA_X_OFFSET + PORTA_LARGURA, y, RECUO_PROFUNDIDADE, divisor_2_x, y, RECUO_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
    else:
        # Acima da porta, barra completa
        criar_cilindro(divisor_1_x, y, RECUO_PROFUNDIDADE, divisor_2_x, y, RECUO_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
    y += ESPACAMENTO_GRADE_VERTICAL

# GRADES LATERAIS DOS RECUOS (paredes perpendiculares)
# Grade lateral esquerda do recuo (de z=0 até z=RECUO_PROFUNDIDADE em x=divisor_1_x)
z = 0
while z <= RECUO_PROFUNDIDADE:
    criar_cilindro(divisor_1_x, 0, z, divisor_1_x, GAIOLA_ALTURA, z, RAIO_BARRA_GRADE, segmentos=6)
    z += ESPACAMENTO_GRADE_PROFUNDIDADE

y = 0
while y <= GAIOLA_ALTURA:
    criar_cilindro(divisor_1_x, y, 0, divisor_1_x, y, RECUO_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
    y += ESPACAMENTO_GRADE_VERTICAL

# Grade lateral direita do recuo (de z=0 até z=RECUO_PROFUNDIDADE em x=divisor_2_x)
z = 0
while z <= RECUO_PROFUNDIDADE:
    criar_cilindro(divisor_2_x, 0, z, divisor_2_x, GAIOLA_ALTURA, z, RAIO_BARRA_GRADE, segmentos=6)
    z += ESPACAMENTO_GRADE_PROFUNDIDADE

y = 0
while y <= GAIOLA_ALTURA:
    criar_cilindro(divisor_2_x, y, 0, divisor_2_x, y, RECUO_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
    y += ESPACAMENTO_GRADE_VERTICAL

# MARCO DA PORTA (estrutura azul ao redor da porta na área recuada)
material_atual = 'gaiola_estrutura'
e_marco = PORTA_MARCO_ESPESSURA

# A porta fica na seção central recuada (z=RECUO_PROFUNDIDADE)
porta_z = RECUO_PROFUNDIDADE - e_marco/2

# Lateral esquerda do marco
criar_caixa(PORTA_X_OFFSET - e_marco, PORTA_Y_BASE, porta_z, 
            e_marco, PORTA_ALTURA, e_marco)

# Lateral direita do marco
criar_caixa(PORTA_X_OFFSET + PORTA_LARGURA, PORTA_Y_BASE, porta_z, 
            e_marco, PORTA_ALTURA, e_marco)

# Parte superior do marco
criar_caixa(PORTA_X_OFFSET - e_marco, PORTA_ALTURA, porta_z, 
            PORTA_LARGURA + 2*e_marco, e_marco, e_marco)

# ============================
# PORTA ENTREABERTA (45 graus)
# ============================

print("    [+] Criando porta de acesso entreaberta (45°)...")

# Especificações da porta
PORTA_ESPESSURA = 50  # porta robusta de 50mm
PORTA_FOLGA_LATERAL = 5  # folga de cada lado
PORTA_FOLGA_VERTICAL = 5  # folga superior e inferior
PORTA_LARGURA_REAL = PORTA_LARGURA - 2*PORTA_FOLGA_LATERAL  # margem de 5mm de cada lado
PORTA_ALTURA_REAL = PORTA_ALTURA - 2*PORTA_FOLGA_VERTICAL  # margem de 5mm superior e inferior

# Posição da dobradiça (lado esquerdo da porta, PERFEITAMENTE alinhado com o batente)
# A dobradiça fica exatamente na face interna do batente esquerdo, com 5mm de folga
dobradica_x = PORTA_X_OFFSET + PORTA_FOLGA_LATERAL  # 5mm para dentro do batente esquerdo
dobradica_y = PORTA_Y_BASE + PORTA_FOLGA_VERTICAL  # 5mm acima do chão
dobradica_z = porta_z + e_marco  # na face interna do marco (para dentro da gaiola)

# Criar porta GRADEADA entreaberta em 45 graus
criar_porta_gradeada_rotacionada(
    x_dobradica=dobradica_x,
    y_base=dobradica_y,
    z_base=dobradica_z,
    largura=PORTA_LARGURA_REAL,
    altura=PORTA_ALTURA_REAL,
    espessura_moldura=PORTA_ESPESSURA,
    angulo_graus=45,
    material='porta'
)

# FECHADURA PARA PORTA GRADEADA (trava tipo cadeado/gancho)
# Posição da fechadura (lado oposto à dobradiça, altura média)
material_atual = 'fechadura'

# Calcular posição da fechadura na porta rotacionada
angulo_porta = math.radians(45)
cos_45 = math.cos(angulo_porta)
sin_45 = math.sin(angulo_porta)

# Distância da dobradiça até a fechadura (80% da largura da porta)
dist_fechadura = PORTA_LARGURA_REAL * 0.80
altura_fechadura = dobradica_y + PORTA_ALTURA_REAL * 0.45

# Posição rotacionada da fechadura
fech_x = dobradica_x + dist_fechadura * cos_45
fech_z = dobradica_z + dist_fechadura * sin_45

# PLACA DE MONTAGEM (retangular, plana na grade)
placa_largura = 120
placa_altura = 220
placa_espessura = 8

criar_caixa(
    fech_x - placa_largura/2,
    altura_fechadura - placa_altura/2,
    fech_z - placa_espessura/2,
    placa_largura,
    placa_altura,
    placa_espessura,
    material='fechadura'
)

# CILINDRO DA FECHADURA (mecanismo de travamento)
cilindro_altura = 60
cilindro_raio = 18

criar_cilindro(
    fech_x, altura_fechadura - cilindro_altura/2, fech_z + placa_espessura/2,
    fech_x, altura_fechadura + cilindro_altura/2, fech_z + placa_espessura/2,
    cilindro_raio, segmentos=12, material='fechadura'
)

# MAÇANETA/PUXADOR (horizontal, para girar a trava)
macana_comprimento = 90
macana_raio = 12

# Calcular a posição da maçaneta rotacionada 90 graus (horizontal)
macana_offset_x = macana_comprimento/2 * cos_45
macana_offset_z = macana_comprimento/2 * sin_45

criar_cilindro(
    fech_x - macana_offset_x, altura_fechadura, fech_z + placa_espessura + 10 - macana_offset_z,
    fech_x + macana_offset_x, altura_fechadura, fech_z + placa_espessura + 10 + macana_offset_z,
    macana_raio, segmentos=8, material='fechadura'
)

# PUXADORES NAS PONTAS DA MAÇANETA (esféricos)
criar_esfera(
    fech_x - macana_offset_x, altura_fechadura, fech_z + placa_espessura + 10 - macana_offset_z,
    18, segmentos_lat=6, segmentos_long=8, material='fechadura'
)

criar_esfera(
    fech_x + macana_offset_x, altura_fechadura, fech_z + placa_espessura + 10 + macana_offset_z,
    18, segmentos_lat=6, segmentos_long=8, material='fechadura'
)

# DOBRADIÇAS (3 dobradiças ao longo da porta, alinhadas com o batente)
for i in range(3):
    altura_dobradica = dobradica_y + (PORTA_ALTURA_REAL / 4) * (i + 1)
    
    # Cilindro da dobradiça (fixado no batente esquerdo)
    criar_cilindro(
        dobradica_x - 10, altura_dobradica, dobradica_z - 5,
        dobradica_x + 10, altura_dobradica, dobradica_z - 5,
        15, segmentos=6, material='fechadura'
    )

material_atual = 'gaiola_grade'

# Grade traseira
x = 0
while x <= GAIOLA_LARGURA:
    criar_cilindro(x, 0, GAIOLA_PROFUNDIDADE, x, GAIOLA_ALTURA, GAIOLA_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
    x += ESPACAMENTO_GRADE_HORIZONTAL

y = 0
while y <= GAIOLA_ALTURA:
    criar_cilindro(0, y, GAIOLA_PROFUNDIDADE, GAIOLA_LARGURA, y, GAIOLA_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
    y += ESPACAMENTO_GRADE_VERTICAL

# Grade lateral esquerda (com recuo inferior)
# Barras verticais começam acima do recuo
z = RECUO_INFERIOR_PROFUNDIDADE
while z <= GAIOLA_PROFUNDIDADE - RECUO_INFERIOR_PROFUNDIDADE:
    criar_cilindro(0, RECUO_INFERIOR_ALTURA, z, 0, GAIOLA_ALTURA, z, RAIO_BARRA_GRADE, segmentos=6)
    z += ESPACAMENTO_GRADE_PROFUNDIDADE

# Barras horizontais na área não recuada
y = RECUO_INFERIOR_ALTURA
while y <= GAIOLA_ALTURA:
    criar_cilindro(0, y, RECUO_INFERIOR_PROFUNDIDADE, 0, y, GAIOLA_PROFUNDIDADE - RECUO_INFERIOR_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
    y += ESPACAMENTO_GRADE_VERTICAL

# Grade dentro do recuo inferior esquerdo (área recuada frontal)
z = 0
while z <= RECUO_INFERIOR_PROFUNDIDADE:
    criar_cilindro(RECUO_INFERIOR_PROFUNDIDADE, 0, z, RECUO_INFERIOR_PROFUNDIDADE, RECUO_INFERIOR_ALTURA, z, RAIO_BARRA_GRADE, segmentos=6)
    z += ESPACAMENTO_GRADE_PROFUNDIDADE

y = 0
while y <= RECUO_INFERIOR_ALTURA:
    criar_cilindro(RECUO_INFERIOR_PROFUNDIDADE, y, 0, RECUO_INFERIOR_PROFUNDIDADE, y, RECUO_INFERIOR_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
    y += ESPACAMENTO_GRADE_VERTICAL

# Grade dentro do recuo inferior esquerdo (área recuada traseira)
z = GAIOLA_PROFUNDIDADE - RECUO_INFERIOR_PROFUNDIDADE
while z <= GAIOLA_PROFUNDIDADE:
    criar_cilindro(RECUO_INFERIOR_PROFUNDIDADE, 0, z, RECUO_INFERIOR_PROFUNDIDADE, RECUO_INFERIOR_ALTURA, z, RAIO_BARRA_GRADE, segmentos=6)
    z += ESPACAMENTO_GRADE_PROFUNDIDADE

y = 0
while y <= RECUO_INFERIOR_ALTURA:
    criar_cilindro(RECUO_INFERIOR_PROFUNDIDADE, y, GAIOLA_PROFUNDIDADE - RECUO_INFERIOR_PROFUNDIDADE, RECUO_INFERIOR_PROFUNDIDADE, y, GAIOLA_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
    y += ESPACAMENTO_GRADE_VERTICAL

# Grade lateral direita (com recuo inferior)
# Barras verticais começam acima do recuo
z = RECUO_INFERIOR_PROFUNDIDADE
while z <= GAIOLA_PROFUNDIDADE - RECUO_INFERIOR_PROFUNDIDADE:
    criar_cilindro(GAIOLA_LARGURA, RECUO_INFERIOR_ALTURA, z, GAIOLA_LARGURA, GAIOLA_ALTURA, z, RAIO_BARRA_GRADE, segmentos=6)
    z += ESPACAMENTO_GRADE_PROFUNDIDADE

# Barras horizontais na área não recuada
y = RECUO_INFERIOR_ALTURA
while y <= GAIOLA_ALTURA:
    criar_cilindro(GAIOLA_LARGURA, y, RECUO_INFERIOR_PROFUNDIDADE, GAIOLA_LARGURA, y, GAIOLA_PROFUNDIDADE - RECUO_INFERIOR_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
    y += ESPACAMENTO_GRADE_VERTICAL

# Grade dentro do recuo inferior direito (área recuada frontal)
z = 0
while z <= RECUO_INFERIOR_PROFUNDIDADE:
    criar_cilindro(GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE, 0, z, GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE, RECUO_INFERIOR_ALTURA, z, RAIO_BARRA_GRADE, segmentos=6)
    z += ESPACAMENTO_GRADE_PROFUNDIDADE

y = 0
while y <= RECUO_INFERIOR_ALTURA:
    criar_cilindro(GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE, y, 0, GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE, y, RECUO_INFERIOR_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
    y += ESPACAMENTO_GRADE_VERTICAL

# Grade dentro do recuo inferior direito (área recuada traseira)
z = GAIOLA_PROFUNDIDADE - RECUO_INFERIOR_PROFUNDIDADE
while z <= GAIOLA_PROFUNDIDADE:
    criar_cilindro(GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE, 0, z, GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE, RECUO_INFERIOR_ALTURA, z, RAIO_BARRA_GRADE, segmentos=6)
    z += ESPACAMENTO_GRADE_PROFUNDIDADE

y = 0
while y <= RECUO_INFERIOR_ALTURA:
    criar_cilindro(GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE, y, GAIOLA_PROFUNDIDADE - RECUO_INFERIOR_PROFUNDIDADE, GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE, y, GAIOLA_PROFUNDIDADE, RAIO_BARRA_GRADE, segmentos=6)
    y += ESPACAMENTO_GRADE_VERTICAL

# ============================
# RECUOS LATERAIS (conforme imagem de referência)
# ============================

print("[4/7] Criando recuos laterais (reentrâncias frontal)...")

material_atual = 'gaiola_estrutura'
e = ESPESSURA_BARRA_ESTRUTURAL

# Posições das seções (baseado nas dimensões: 1129mm + 1085mm + 1045mm)
secao_1_largura = 1129  # seção esquerda
secao_2_largura = 1085  # seção central (com porta, recuada)
secao_3_largura = 1045  # seção direita

# Posições X dos divisores
divisor_1_x = secao_1_largura
divisor_2_x = secao_1_largura + secao_2_largura

# SEÇÃO ESQUERDA (1129mm) - Avançada até a frente (z=0)
# Pilar frontal esquerdo da seção 1
criar_caixa(divisor_1_x - e, 0, 0, e, GAIOLA_ALTURA, e)

# Barra horizontal frontal inferior da seção 1
criar_caixa(0, 0, 0, divisor_1_x, e, e)

# Barra horizontal frontal superior da seção 1
criar_caixa(0, GAIOLA_ALTURA - e, 0, divisor_1_x, e, e)

# Barras horizontais intermediárias da seção 1
for altura in [1137, 1807]:
    criar_caixa(0, altura - e/2, 0, divisor_1_x, e, e)

# PAREDE LATERAL ESQUERDA DO RECUO (conecta z=0 até z=RECUO_PROFUNDIDADE)
criar_caixa(divisor_1_x - e, 0, 0, e, GAIOLA_ALTURA, RECUO_PROFUNDIDADE)

# BARRA TRANSVERSAL ESQUERDA (perpendicular, em z=RECUO_PROFUNDIDADE)
criar_caixa(divisor_1_x - e, 0, RECUO_PROFUNDIDADE - e, 
            e, GAIOLA_ALTURA, e)

# SEÇÃO DIREITA (1045mm) - Avançada até a frente (z=0)
# Pilar frontal direito da seção 3
criar_caixa(divisor_2_x, 0, 0, e, GAIOLA_ALTURA, e)

# Barra horizontal frontal inferior da seção 3
criar_caixa(divisor_2_x, 0, 0, secao_3_largura, e, e)

# Barra horizontal frontal superior da seção 3
criar_caixa(divisor_2_x, GAIOLA_ALTURA - e, 0, secao_3_largura, e, e)

# Barras horizontais intermediárias da seção 3
for altura in [1137, 1807]:
    criar_caixa(divisor_2_x, altura - e/2, 0, secao_3_largura, e, e)

# PAREDE LATERAL DIREITA DO RECUO (conecta z=0 até z=RECUO_PROFUNDIDADE)
criar_caixa(divisor_2_x, 0, 0, e, GAIOLA_ALTURA, RECUO_PROFUNDIDADE)

# BARRA TRANSVERSAL DIREITA (perpendicular, em z=RECUO_PROFUNDIDADE)
criar_caixa(divisor_2_x, 0, RECUO_PROFUNDIDADE - e, 
            e, GAIOLA_ALTURA, e)

# SEÇÃO CENTRAL RECUADA (1085mm) - A porta fica aqui
# Esta seção permanece ABERTA (apenas com grade laranja vazada)
# Não há barras estruturais azuis fechando atrás da grade

# ============================
# RECUOS INFERIORES LATERAIS (base recuada conforme imagem)
# ============================

print("    [+] Criando recuos inferiores laterais (base recuada)...")

material_atual = 'gaiola_estrutura'

# RECUO INFERIOR LATERAL ESQUERDO (perfil em "U" no CENTRO: ___| U |___ )
recuo_u_z_fim = RECUO_U_Z_INICIO + RECUO_U_LARGURA_TOTAL

# Parte FRONTAL (z=0 até início do U) - no chão
criar_caixa(
    0,
    0,
    0,
    RECUO_INFERIOR_PROFUNDIDADE,
    e,
    RECUO_U_Z_INICIO
)

# Parede vertical FRONTAL do U (sobe)
criar_caixa(
    RECUO_INFERIOR_PROFUNDIDADE - e,
    0,
    RECUO_U_Z_INICIO - e,
    e,
    RECUO_INFERIOR_ALTURA,
    e
)

# Barra horizontal superior FRONTAL do U
criar_caixa(
    0,
    RECUO_INFERIOR_ALTURA - e/2,
    RECUO_U_Z_INICIO - e,
    RECUO_INFERIOR_PROFUNDIDADE,
    e,
    e
)

# Plataforma ELEVADA no centro do U
criar_caixa(
    0,
    RECUO_INFERIOR_ALTURA - e,
    RECUO_U_Z_INICIO,
    RECUO_INFERIOR_PROFUNDIDADE,
    e,
    RECUO_U_LARGURA_TOTAL
)

# Parede vertical interna do U (ao longo do centro)
criar_caixa(
    RECUO_INFERIOR_PROFUNDIDADE - e,
    0,
    RECUO_U_Z_INICIO,
    e,
    RECUO_INFERIOR_ALTURA,
    RECUO_U_LARGURA_TOTAL
)

# Parede vertical TRASEIRA do U (desce)
criar_caixa(
    RECUO_INFERIOR_PROFUNDIDADE - e,
    0,
    recuo_u_z_fim,
    e,
    RECUO_INFERIOR_ALTURA,
    e
)

# Barra horizontal superior TRASEIRA do U
criar_caixa(
    0,
    RECUO_INFERIOR_ALTURA - e/2,
    recuo_u_z_fim,
    RECUO_INFERIOR_PROFUNDIDADE,
    e,
    e
)

# Parte TRASEIRA (fim do U até z=GAIOLA_PROFUNDIDADE) - no chão
criar_caixa(
    0,
    0,
    recuo_u_z_fim,
    RECUO_INFERIOR_PROFUNDIDADE,
    e,
    GAIOLA_PROFUNDIDADE - recuo_u_z_fim
)

# RECUO INFERIOR LATERAL DIREITO (espelhado)
# Parte FRONTAL (z=0 até início do U) - no chão
criar_caixa(
    GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE,
    0,
    0,
    RECUO_INFERIOR_PROFUNDIDADE,
    e,
    RECUO_U_Z_INICIO
)

# Parede vertical FRONTAL do U (sobe)
criar_caixa(
    GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE,
    0,
    RECUO_U_Z_INICIO - e,
    e,
    RECUO_INFERIOR_ALTURA,
    e
)

# Barra horizontal superior FRONTAL do U
criar_caixa(
    GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE,
    RECUO_INFERIOR_ALTURA - e/2,
    RECUO_U_Z_INICIO - e,
    RECUO_INFERIOR_PROFUNDIDADE,
    e,
    e
)

# Plataforma ELEVADA no centro do U
criar_caixa(
    GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE,
    RECUO_INFERIOR_ALTURA - e,
    RECUO_U_Z_INICIO,
    RECUO_INFERIOR_PROFUNDIDADE,
    e,
    RECUO_U_LARGURA_TOTAL
)

# Parede vertical interna do U (ao longo do centro)
criar_caixa(
    GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE,
    0,
    RECUO_U_Z_INICIO,
    e,
    RECUO_INFERIOR_ALTURA,
    RECUO_U_LARGURA_TOTAL
)

# Parede vertical TRASEIRA do U (desce)
criar_caixa(
    GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE,
    0,
    recuo_u_z_fim,
    e,
    RECUO_INFERIOR_ALTURA,
    e
)

# Barra horizontal superior TRASEIRA do U
criar_caixa(
    GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE,
    RECUO_INFERIOR_ALTURA - e/2,
    recuo_u_z_fim,
    RECUO_INFERIOR_PROFUNDIDADE,
    e,
    e
)

# Parte TRASEIRA (fim do U até z=GAIOLA_PROFUNDIDADE) - no chão
criar_caixa(
    GAIOLA_LARGURA - RECUO_INFERIOR_PROFUNDIDADE,
    0,
    recuo_u_z_fim,
    RECUO_INFERIOR_PROFUNDIDADE,
    e,
    GAIOLA_PROFUNDIDADE - recuo_u_z_fim
)

# Ajustar pilares laterais para começarem acima do recuo
# Os pilares das laterais devem começar em RECUO_INFERIOR_ALTURA
# (isso já está parcialmente implementado, mas vamos garantir a continuidade)

# ============================
# 2. GABINETE ELETRICO CENTRAL
# ============================

print("[5/7] Criando gabinete eletrico central (cinza)...")

material_atual = 'gabinete_base'

# Base elevada
criar_caixa(
    GABINETE_X,
    GABINETE_Y,
    GABINETE_Z,
    GABINETE_LARGURA,
    GABINETE_BASE_ALTURA,
    GABINETE_PROFUNDIDADE
)

material_atual = 'gabinete_corpo'

# Corpo principal do gabinete
gab_y_inicio = GABINETE_Y + GABINETE_BASE_ALTURA
criar_caixa(
    GABINETE_X,
    gab_y_inicio,
    GABINETE_Z,
    GABINETE_LARGURA,
    GABINETE_ALTURA,
    GABINETE_PROFUNDIDADE
)

# ============================
# 3. PAINEL DE CONTROLE FRONTAL
# ============================

print("[6/7] Criando painel de controle...")

material_atual = 'painel_controle'

# Painel frontal (setor direito do gabinete)
painel_x = GABINETE_X + PAINEL_X_OFFSET
painel_y = gab_y_inicio
painel_z = GABINETE_Z - 2  # projetado para frente

criar_caixa(
    painel_x,
    painel_y,
    painel_z,
    PAINEL_LARGURA,
    GABINETE_ALTURA,
    5
)

# ============================
# 4. TORRE DE SINALIZACAO
# ============================

print("[7/7] Criando torre de sinalizacao...")

torre_x = painel_x + 100
torre_y_base = gab_y_inicio + GABINETE_ALTURA
torre_z = GABINETE_Z + GABINETE_PROFUNDIDADE/2

# Haste da torre (cinza metalico)
criar_cilindro(
    torre_x, torre_y_base, torre_z,
    torre_x, torre_y_base + TORRE_HASTE_ALTURA, torre_z,
    15, segmentos=8, material='torre_haste'
)

# Segmento inferior (verde)
criar_esfera(
    torre_x,
    torre_y_base + TORRE_HASTE_ALTURA,
    torre_z,
    TORRE_RAIO,
    segmentos_lat=8,
    segmentos_long=12,
    material='torre_verde'
)

# Segmento superior (vermelho)
criar_esfera(
    torre_x,
    torre_y_base + TORRE_HASTE_ALTURA + TORRE_SEGMENTO_ALTURA,
    torre_z,
    TORRE_RAIO,
    segmentos_lat=8,
    segmentos_long=12,
    material='torre_vermelha'
)

# ============================
# 5. COMPONENTES DO PAINEL
# ============================

print("    [+] Criando componentes do painel (display, botoes, switches)...")

# Display/HMI
display_x = painel_x + 120
display_y = painel_y + GABINETE_ALTURA - 300
display_z = painel_z - 5

criar_caixa(
    display_x,
    display_y,
    display_z,
    DISPLAY_LARGURA,
    DISPLAY_ALTURA,
    8,
    material='display'
)

# Coluna de botoes verdes (5 botoes)
botao_x_esq = display_x + 50
botao_y_start = display_y - 100

for i in range(5):
    criar_esfera(
        botao_x_esq,
        botao_y_start - i*60,
        display_z - 3,
        BOTAO_RAIO,
        segmentos_lat=6,
        segmentos_long=8,
        material='botoes_verdes'
    )

# Coluna de botoes vermelhos (5 botoes)
botao_x_dir = display_x + DISPLAY_LARGURA - 50

for i in range(5):
    criar_esfera(
        botao_x_dir,
        botao_y_start - i*60,
        display_z - 3,
        BOTAO_RAIO,
        segmentos_lat=6,
        segmentos_long=8,
        material='botoes_vermelhos'
    )

# Switches/Disjuntores (4 unidades)
switch_y = botao_y_start - 400
switch_spacing = 80

for i in range(4):
    switch_x = display_x + 30 + i*switch_spacing

    # Corpo do switch
    criar_caixa(
        switch_x,
        switch_y,
        display_z - 5,
        SWITCH_LARGURA,
        SWITCH_ALTURA,
        15,
        material='switches'
    )

    # Alavanca
    criar_caixa(
        switch_x + SWITCH_LARGURA/2 - 8,
        switch_y + SWITCH_ALTURA - 30,
        display_z - 10,
        16,
        40,
        8,
        material='switches'
    )

# ============================
# EXPORTACAO OBJ
# ============================

print("\n" + "="*70)
print("GERANDO ARQUIVOS OBJ E MTL...")
print("="*70)

# Criar diretório generated se não existir
generated_dir = os.path.join(os.path.dirname(__file__), "generated")
os.makedirs(generated_dir, exist_ok=True)

obj_filename = os.path.join(generated_dir, "gaiola_gabinete_industrial.obj")
mtl_filename = os.path.join(generated_dir, "gaiola_gabinete_industrial.mtl")

with open(obj_filename, "w", encoding='utf-8') as f:
    f.write("# Gaiola de Seguranca com Gabinete Eletrico Industrial\n")
    f.write("# Modelo 3D Profissional\n")
    f.write(f"# Dimensoes Gaiola: {GAIOLA_LARGURA}x{GAIOLA_ALTURA}x{GAIOLA_PROFUNDIDADE}mm\n")
    f.write(f"# Dimensoes Gabinete: {GABINETE_LARGURA}x{GABINETE_ALTURA}x{GABINETE_PROFUNDIDADE}mm\n")
    f.write(f"mtllib {os.path.basename(mtl_filename)}\n\n")

    # Vertices
    f.write(f"# Vertices ({len(vertices)} total)\n")
    for v in vertices:
        f.write(f"v {v[0]:.2f} {v[1]:.2f} {v[2]:.2f}\n")

    f.write("\n")

    # Faces por grupo de material
    for material_nome, faces_lista in grupos_materiais.items():
        if faces_lista:
            f.write(f"\n# Grupo: {material_nome}\n")
            f.write(f"usemtl {material_nome}\n")
            for face_type, indices in faces_lista:
                f.write(f"f {' '.join(map(str, indices))}\n")

print(f"\n[OK] Arquivo OBJ criado: {obj_filename}")
print(f"     Total de vertices: {len(vertices):,}")
print(f"     Total de faces: {sum(len(f) for f in grupos_materiais.values()):,}")

# ============================
# EXPORTACAO MTL (Materiais)
# ============================

mtl_content = """# Materiais Profissionais para Gaiola Industrial com Gabinete Eletrico
# Otimizado para renderização realista em Blender, 3ds Max e visualizadores online

# ========================================
# ESTRUTURA DA GAIOLA - Azul Industrial Metálico
# ========================================
newmtl gaiola_estrutura
Ka 0.08 0.25 0.55
Kd 0.12 0.45 0.85
Ks 0.70 0.75 0.80
Ns 120
d 1.0
illum 2
# Material metálico com acabamento fosco azul industrial

# ========================================
# GRADE DA GAIOLA - Laranja Safety (RAL 2004)
# ========================================
newmtl gaiola_grade
Ka 0.90 0.40 0.05
Kd 1.00 0.50 0.08
Ks 0.65 0.55 0.45
Ns 95
d 1.0
illum 2
# Laranja de segurança vibrante, acabamento semi-brilhante

# ========================================
# TETO EM GRADE - Laranja Safety (RAL 2004)
# ========================================
newmtl gaiola_teto
Ka 0.90 0.40 0.05
Kd 1.00 0.50 0.08
Ks 0.65 0.55 0.45
Ns 95
d 1.0
illum 2
# Mesma cor laranja de segurança da grade

# ========================================
# GABINETE - Base (Aço Escuro)
# ========================================
newmtl gabinete_base
Ka 0.10 0.10 0.10
Kd 0.20 0.20 0.22
Ks 0.75 0.75 0.75
Ns 140
d 1.0
illum 2
# Aço pintado escuro com alto brilho metálico

# ========================================
# GABINETE - Corpo Principal (Aço Galvanizado)
# ========================================
newmtl gabinete_corpo
Ka 0.45 0.45 0.47
Kd 0.65 0.65 0.68
Ks 0.80 0.82 0.85
Ns 150
d 1.0
illum 2
# Cinza metálico claro, acabamento polido tipo inox

# ========================================
# PAINEL DE CONTROLE - Cinza Grafite
# ========================================
newmtl painel_controle
Ka 0.30 0.30 0.32
Kd 0.50 0.50 0.53
Ks 0.70 0.72 0.75
Ns 110
d 1.0
illum 2
# Cinza médio metálico, acabamento semi-fosco profissional

# ========================================
# TORRE - Luz Verde (LED Verde Industrial)
# ========================================
newmtl torre_verde
Ka 0.05 0.80 0.05
Kd 0.10 0.95 0.10
Ks 0.90 0.95 0.90
Ns 200
d 0.85
illum 2
# Verde LED brilhante com efeito luminoso, semi-transparente

# ========================================
# TORRE - Luz Vermelha (LED Vermelho Industrial)
# ========================================
newmtl torre_vermelha
Ka 0.80 0.05 0.05
Kd 0.95 0.10 0.10
Ks 0.95 0.90 0.90
Ns 200
d 0.85
illum 2
# Vermelho LED brilhante com efeito luminoso, semi-transparente

# ========================================
# TORRE - Haste (Alumínio Escovado)
# ========================================
newmtl torre_haste
Ka 0.35 0.35 0.38
Kd 0.55 0.55 0.58
Ks 0.85 0.87 0.90
Ns 160
d 1.0
illum 2
# Alumínio com acabamento escovado, muito reflexivo

# ========================================
# BOTÕES - Verde Indicador (Plástico Iluminado)
# ========================================
newmtl botoes_verdes
Ka 0.05 0.65 0.05
Kd 0.10 0.80 0.12
Ks 0.75 0.80 0.75
Ns 130
d 1.0
illum 2
# Verde indicador plástico com acabamento brilhante

# ========================================
# BOTÕES - Vermelho Indicador (Plástico Iluminado)
# ========================================
newmtl botoes_vermelhos
Ka 0.65 0.05 0.05
Kd 0.80 0.10 0.12
Ks 0.80 0.75 0.75
Ns 130
d 1.0
illum 2
# Vermelho indicador plástico com acabamento brilhante

# ========================================
# DISPLAY HMI - Tela LCD (Azul Backlight)
# ========================================
newmtl display
Ka 0.02 0.10 0.25
Kd 0.05 0.25 0.55
Ks 0.60 0.65 0.70
Ns 180
d 1.0
illum 2
# Display LCD com backlight azul, superfície levemente reflexiva

# ========================================
# SWITCHES/DISJUNTORES - Plástico Industrial Preto
# ========================================
newmtl switches
Ka 0.02 0.02 0.02
Kd 0.10 0.10 0.10
Ks 0.40 0.42 0.45
Ns 85
d 1.0
illum 2
# Plástico preto industrial fosco com leve reflexão

# ========================================
# PORTA - Aço Pintado Cinza Escuro (RAL 7016)
# ========================================
newmtl porta
Ka 0.15 0.18 0.20
Kd 0.28 0.32 0.35
Ks 0.60 0.62 0.65
Ns 110
d 1.0
illum 2
# Porta de aço industrial robusta, acabamento fosco metálico

# ========================================
# FECHADURA/MAÇANETA - Aço Inoxidável Polido
# ========================================
newmtl fechadura
Ka 0.50 0.50 0.52
Kd 0.70 0.72 0.75
Ks 0.90 0.92 0.95
Ns 180
d 1.0
illum 2
# Aço inoxidável altamente polido e reflexivo
"""

with open(mtl_filename, "w", encoding='utf-8') as f:
    f.write(mtl_content)

print(f"[OK] Arquivo MTL criado: {mtl_filename}")

# ============================
# ESTATISTICAS FINAIS
# ============================

print("\n" + "="*70)
print("MODELO 3D FINALIZADO COM SUCESSO!")
print("="*70)
print(f"\nArquivos gerados:")
print(f"  - {obj_filename}")
print(f"  - {mtl_filename}")
print(f"\nEstatisticas do modelo:")
print(f"  - Vertices totais: {len(vertices):,}")
print(f"  - Gaiola estrutura: {len(grupos_materiais['gaiola_estrutura']):,} faces")
print(f"  - Gaiola grade: {len(grupos_materiais['gaiola_grade']):,} faces")
print(f"  - Gaiola teto: {len(grupos_materiais['gaiola_teto']):,} faces")
print(f"  - Porta de acesso: {len(grupos_materiais['porta']):,} faces")
print(f"  - Fechadura/maçaneta: {len(grupos_materiais['fechadura']):,} faces")
print(f"  - Gabinete corpo: {len(grupos_materiais['gabinete_corpo']):,} faces")
print(f"  - Gabinete base: {len(grupos_materiais['gabinete_base']):,} faces")
print(f"  - Painel controle: {len(grupos_materiais['painel_controle']):,} faces")
print(f"  - Torre verde: {len(grupos_materiais['torre_verde']):,} faces")
print(f"  - Torre vermelha: {len(grupos_materiais['torre_vermelha']):,} faces")
print(f"  - Torre haste: {len(grupos_materiais['torre_haste']):,} faces")
print(f"  - Botoes verdes: {len(grupos_materiais['botoes_verdes']):,} faces")
print(f"  - Botoes vermelhos: {len(grupos_materiais['botoes_vermelhos']):,} faces")
print(f"  - Display: {len(grupos_materiais['display']):,} faces")
print(f"  - Switches: {len(grupos_materiais['switches']):,} faces")
print(f"\nCaracteristicas do modelo:")
print(f"  [+] Gaiola de seguranca AZUL com detalhes LARANJA (grade e teto)")
print(f"  [+] PORTA DE ACESSO GRADEADA ENTREABERTA 45° ({PORTA_LARGURA}mm x {PORTA_ALTURA}mm)")
print(f"  [+] Porta com moldura estrutural + grade interna (totalmente vazada)")
print(f"  [+] FECHADURA tipo trava com maçaneta funcional para porta gradeada")
print(f"  [+] 3 dobradiças de segurança")
print(f"  [+] BATENTES CORTADOS na área da porta (sem obstruções)")
print(f"  [+] RECUOS FRONTAIS LATERAIS dividindo a gaiola em 3 seções")
print(f"  [+] RECUOS INFERIORES em 'U' CENTRALIZADO nas laterais")
print(f"  [+] Gabinete eletrico central cinza")
print(f"  [+] Torre de sinalizacao no topo (luz verde + vermelha)")
print(f"  [+] Painel de controle com display HMI (azul)")
print(f"  [+] 10 botoes indicadores (5 verdes + 5 vermelhos)")
print(f"  [+] 4 switches/disjuntores principais (pretos)")
print(f"  [+] Sistema de materiais coloridos realistas")
print(f"\nPara visualizar:")
print(f"  - Blender: File > Import > Wavefront (.obj)")
print(f"  - Online: https://3dviewer.net")
print("="*70)
