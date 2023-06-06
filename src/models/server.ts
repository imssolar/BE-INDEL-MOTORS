import express, { Application } from 'express'
import { sequelize } from '../db'
import accountsRoutes from '../routes/client'
export class Server {
	private app: Application
	private port: string | undefined
	private apiPaths = {
		accountsPath: '/api/account',
	}
	constructor() {
		this.app = express()
		this.port = '4000'
		this.conectarDB()
		this.middlewares()
		this.routes()
	}


	async conectarDB() {
		//Cambiar el método sync por un método que sirve para pruebas que lo que hace es borrar la base de datos y ejecutar nuevamente
		await sequelize.sync({ force: true })
	}

	middlewares() {
		// this.app.use(cors())
		this.app.use(express.json())
	}

	routes() {
		this.app.use(this.apiPaths.accountsPath, accountsRoutes)
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Servidor Corriendo en el puerto ${this.port}`)
		})
	}
}