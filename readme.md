# API REST Things I already know / Lo que querais

Crea una API REST que se conecte a un fichero JSON, para manipular recursos de tipo cosas que ya sé. El JSON tendrá una sola propiedad de tipo array, donde almacenarán objetos que representarán cosas que hemos aprendido en el bootcamp.

La API REST debe tener los siguientes endpoints:

[GET] /sneakers -> devuelve el array de cosas que ya sé

[GET] /sneakers/:id -> devuelve una cosa que ya sé

[DELETE] /sneakers/:id -> borra una cosa que ya sé

[POST] /sneakers -> crea una cosa que ya sé (la recibe en el body)

[PATCH] /sneakers -> modifica una cosa que ya sé (la recibe en el body)

Usamos express con las capas:

- app
- router
- controller
- repo

AÑADIMOS un front con REDUX testado

- Lista de 'things'

- Añadir 'thing'

- Borrar 'thing'

- Editar 'thing'

- Página de detalle
