

# Adalab modulo-2-Evaluación final 

Se desarrollo una aplicación web de Breaking Bad, que  permite des/marcar los personajes como favoritas y guardarlos en local storage, ralizado con **JavaScript**;
también tiene una parte de maquetación con **HTML y Sass**.

## Guía de inicio rápido

Al levantar la página se muestran todos los resultados de los personajes de la serie, la aplicación se conecta a The Breaking Bad API:
**https://breakingbadapi.com/api/characters**
Por cada personaje obtenido en el resultado de la búsqueda se pinta una tarjeta donde
mostramos la foto del personaje, el nombre del personaje y si está vivo o muerto.
La usuaria tiene la opción de buscar personajes por su nombre, al hacer clic sobre el botón de Buscar, la
aplicación solo muestra aquellos personajes que coinciden con la búsqueda realizada por la usuaria:
Para lograrlo se utilizo siguiente url con el parámetro name para obtener del API solo los usuarios que
coincidan con el nombre especificado por la usuaria: https://breakingbadapi.com/api/characters?
name=Walter

La usuaria puede indicar cuáles son sus personajes favoritos. Para ello, al hacer clic sobre un personaje, se cambian los estilos de la tarjeta del personaje para indicar que es una personaje favorito.
se muestra un listado con los personajes favoritos.
Los personajes favoritos siguen apareciendo en la página aunque la usuaria realice otra búsqueda, ya que se almacena el listado en el localStorage.

