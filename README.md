Crea una aplicacion para buscar peliculas

APIs a usar:

✅

- https://www.omdbapi.com/
- API_KEY: e1f20ea6 <- Mi llave

-- http://www.omdbapi.com/?apikey=e1f20ea6&s=star

Requerimientos ->

✅ Necesita mostrar un input para buscar la pelicula y un boton para buscar.

✅ Lista las peliculas encontradas y muestra el titulo, a;o y poster, NO HAGAS FECTH AUN.

    	Mas bien, crea un 'mockup' del JSON cuando hay un response 'Positivo' en el endpoint del API en una carpeta de tu VSC y nombrala 'mockup_good_response'

    	Hacer lo mismo cuando hay un response 'Negativo'

    	Con estos mocks entonces ahora si, lista las peliculas encontradas

✅ Crea un condicional si no hay peliculas, mostrar 'no se encontro resultados para tu busqueda'

✅ Crea un componente para el map de movies

✅ Extrar logica del contrato del API para no depender directamente de sus valores, abstraer a custom hook llamado useMovies.

    hint: Mapear los results del mock.json y crear un objeto para cada elemento con sus nuevos value/pair

✅ controlar inputs

✅ Manejar errores para ->

a. Si el string es vacio
b. Si solo hay numeros (ReGex)
c. Si es menor a 3 caracteres

✅ Desplegar el error en cuestion debajo del buscador de peliculas

✅ En el manejo de error anterior, hacerlo todo en useEffect (En caso de habero hecho con useState) y pasarlo a un custom hook llamado 'useSearch'

✅ Manejar el caso donde el primer input es 'vacio' y nos tira un error inmediatamente, en el primer render de la pagina, no queremos que tire este error

✅ Haz que las peliculas se muestren en un grid responsive.

✅ Realiza el fetch

✅ Crea un estado loading en useMovies y renderizar 'loading...' si es true, o el componente en cuestion si es 'false'

Primera iteracion:

✅ Evitar que se haga la misma busqueda dos veces seguidas

✅ crear un sort por orden alfabetico

- Haz que el sort solo se ejecute cuando cambien las peliculas a mostrarse (dependencia)

- Haz que la busqueda se haga automaticamente al escribir

- Evita que se haga la busqueda continuamente al escribir (debounce)

<!-- Bairesdev -->
