import { ConsoleLogger } from '@nestjs/common'

export class Logger extends ConsoleLogger {

	log(_: any, context?: string): void {
		if (![
			'InstanceLoader',
			'RoutesResolver',
			'RouterExplorer',
			'WebSocketsController'
		].includes(context)) {
			// eslint-disable-next-line prefer-rest-params
			super.log.apply(this, arguments)
		}
	}

}
