# Entrega Semana 8
## Ghost 
Proyecto en el que se elabora una suite de pruebas e2e para Ghost CMS (para las versiones 3.3.0 y 3.42.5) utilizando como API de automatización [Cypress](https://www.cypress.io/).

## Integrantes
1. Carlos Garcia - cj.garcias1@uniandes.edu.co
2. Jose Montero - j.monterov@uniandes.edu.co
3. Juan Camilo Daza - jc.dazam1@uniandes.edu.co
4. Manuel Bello - m.bello@uniandes.edu.co

### Funcionalidades y escenarios de pruebas
En [este documento](https://github.com/jmonterovalverdeMISO/MISO4103-EntregaSemana/wiki/Funcionalidades) se describen las funcionalidades a probar y los escenarios que se generaron se pueden ver en este otro [enlace](https://github.com/jmonterovalverdeMISO/MISO4103EntregaFinal/wiki/Escenario-de-Pruebas). A continuación de tiene una tabla resumen de las mismas:

| Id | Nombre | 
| - | - | 
| [F02](https://github.com/jmonterovalverdeMISO/MISO4103-EntregaSemana/wiki/F02) | Crear Post | 
| [F04](https://github.com/jmonterovalverdeMISO/MISO4103-EntregaSemana/wiki/F04) | Crear Page | 

Todas las funcionalidades tinen escenarios para ser probadas en ambas versiones de Ghost. Adicionalmente una vez que las pruebas han ejecutado se puede hacer VRT sobre los resultados de las mismas

# Correr pruebas (Headless) :rocket:
## Pasos para despliegue
1. Instalar [docker](https://www.docker.com/get-started) segun tu sistema operativo
2. Clonar este repositorio en su máquina local. Si necesita ayuda puede consultar este [link](https://docs.github.com/es/github/creating-cloning-and-archiving-repositories/cloning-a-repository)

### Correr pruebas Ghost 3.3.0
1. En el directorio raiz ejecutar `docker-compose -f docker-compose.ghost-3.3.0.yml build` para construir las imagenes del proyecto
2. Ejecutar `docker-compose -f docker-compose.ghost-3.3.0.yml up -d` para iniciar la infraestructura de pruebas

### Correr pruebas Ghost 3.42.5
1. En el directorio raiz ejecutar `docker-compose -f docker-compose.ghost-3.42.5.yml build` para construir las imagenes del proyecto
2. Ejecutar `docker-compose -f docker-compose.ghost-3.42.5.yml up -d` para iniciar la infraestructura de pruebas

### Correr pruebas regresion visual
Antes de correr las pruebas de regresión visual, debes haber corrido los suite para Ghost 3.3.0 y 3.42.5 previamente.
1. En el directorio raiz ejecutar `docker-compose -f docker-compose.vrt.yml build` para construir las imagenes del proyecto
2. Ejecutar `docker-compose -f docker-compose.vrt.yml up -d` para iniciar la infraestructura de pruebas

## Ver ejecución de pruebas
Para visualizar el progreso de un contenedor puedes ejecutar los siguientes comandos en una consola:
Notas: 
- La composición y la ejecución de los escenarios tarda un tiempo dependiendo de la capacidad de su máquina local, por lo que si en el primer intento no le salen logs, dele unos segundos más para que el componente se ejecute

1. Cypress `docker logs cypress-chrome`
2. Ghost `docker logs ghost`

## Ver resultados
Una vez la ejecución de las pruebas hayan finalizado los resultados se guardan en las siguientes direcciones segun el suite de pruebas

1. Cypress `cypress-ghost/cypress`
3. VRT `vrt-results/report`

## Ver reporte de Pruebas de Regresión Visual :paintbrush:
Este es generado a través de Cypress por esta razón se debe ejecutar primero este suite de pruebas. Una vez finalizado a través de `vrt-results/report/index.html` se puede visualizar los resultados de las pruebas de regresión visual

![Screenshot from 2021-05-16 22-11-44](https://user-images.githubusercontent.com/78863809/118427858-ccf52e00-b693-11eb-85c2-b1c56c9a727a.png)
