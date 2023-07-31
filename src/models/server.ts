import express, { Application } from 'express'
import { sequelize } from '../db'
import accountsRoutes from '../routes/client'
import workOrderRoutes from '../routes/workOder'
import spareRoutes from '../routes/spare'
import unitRoutes from '../routes/unit'
import spareGroupsRoutes from '../routes/spareGroup'
import vehicleRoutes from '../routes/vehicle'
import orderGroupsRoutes from '../routes/orderGroup'


 export class Server {
	private app: Application
	private port: string | undefined
	private apiPaths = {
		accountsPath: '/api/account',
		workOrderPath: '/api/workorder',
		sparePath: '/api/spare',
		unitPath: '/api/unit',
		vehiclePath: '/api/vehicle',
		orderGroupPath:'/api/ordergroup',
		spareGroupPath:'/api/spareGroup'
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
		await sequelize.sync()
	}

	middlewares() {
		// this.app.use(cors())
		this.app.use(express.json())
	}

	routes() {
		this.app.use(this.apiPaths.accountsPath, accountsRoutes)
		this.app.use(this.apiPaths.workOrderPath, workOrderRoutes)
		this.app.use(this.apiPaths.sparePath, spareRoutes)
		this.app.use(this.apiPaths.unitPath, unitRoutes)
		this.app.use(this.apiPaths.spareGroupPath, spareGroupsRoutes)
		this.app.use(this.apiPaths.vehiclePath,vehicleRoutes)
		this.app.use(this.apiPaths.orderGroupPath,orderGroupsRoutes)
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Servidor Corriendo en el puerto ${this.port}`)
		})
	}
}