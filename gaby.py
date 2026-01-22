import turtle
import random
import time

# --- CONFIGURACIÓN INICIAL ---
screen = turtle.Screen()
screen.setup(width=800, height=800)
screen.bgcolor("black")
screen.title("Para Gaby")

t = turtle.Turtle()
t.hideturtle()

# --- FUNCIONES DE DIBUJO ---
def draw_heart(x, y, size, color, fill=True):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(color)
    
    if fill: t.begin_fill()
    
    t.left(140)
    t.forward(size)
    
    # Curvas optimizadas
    for _ in range(200):
        t.right(1)
        t.forward(size * 0.009)
        
    t.left(120)
    
    for _ in range(200):
        t.right(1)
        t.forward(size * 0.009)
        
    t.forward(size)
    
    if fill: t.end_fill()

def write_final_message(text, x, y):
    t.penup()
    t.goto(x, y)
    t.color("white")
    # Aparece el mensaje con un ligero retraso para dar suspenso
    time.sleep(0.5)
    t.write(text, align="center", font=("Arial", 45, "bold"))

# --- EJECUCIÓN ---

# 1. Fondo de 100 corazones (Instantáneo)
screen.tracer(0) 
colors = ["#ff1493", "#ff69b4", "#ff0000", "#800080", "#4b0082", "#ff007f"]

for _ in range(100):
    x = random.randint(-400, 400)
    y = random.randint(-400, 400)
    s = random.randint(5, 35)
    draw_heart(x, y, s, random.choice(colors))

screen.update()

# 2. Corazón principal (Animación rápida)
screen.tracer(2) 
t.speed(0)
# Dibujamos el corazón central
draw_heart(0, -100, 200, "#ff1493") 
screen.update()

# 3. Mensaje final (Aparece al terminar el dibujo)
# Lo posicionamos justo debajo del corazón
write_final_message("Te amo Gaby", 0, -250)

# 4. Pie de página
t.penup()
t.goto(0, -350)
t.color("gray")
t.write("(Haz click para cerrar)", align="center", font=("Arial", 10, "italic"))

screen.update()
screen.exitonclick()