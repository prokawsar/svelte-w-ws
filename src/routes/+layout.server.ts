import { kindeAuthClient } from '@kinde-oss/kinde-sveltekit-sdk'
import type { SessionManager } from '@kinde-oss/kinde-typescript-sdk'
import type { RequestEvent } from '@sveltejs/kit'

export async function load({ request }: RequestEvent) {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	)
	let userProfile = null
	if (isAuthenticated) {
		// userProfile = await kindeAuthClient.getUser(request as unknown as SessionManager)
		userProfile = await kindeAuthClient.getUserProfile(request as unknown as SessionManager)
		const getOrganization = kindeAuthClient.getOrganization(request as unknown as SessionManager)
		const userOrganizations = kindeAuthClient.getUserOrganizations(
			request as unknown as SessionManager
		)
		const permission = kindeAuthClient.getPermission(
			request as unknown as SessionManager,
			'read:profile'
		)

		const permissions = kindeAuthClient.getPermissions(request as unknown as SessionManager)
		const aud = kindeAuthClient.getClaim(request as unknown as SessionManager, 'aud')

		try {
			const theme = await kindeAuthClient.getStringFlag(
				request as unknown as SessionManager,
				'theme'
			)
			// const enable_dark_theme = await kindeAuthClient.getBooleanFlag(
			// 	request as unknown as SessionManager,
			// 	'enable_dark_theme'
			// )
			// const user_limit = await kindeAuthClient.getIntegerFlag(
			// 	request as unknown as SessionManager,
			// 	'user_limit'
			// )

			console.log({
				userProfile,
				getOrganization,
				userOrganizations,
				permission,
				permissions,
				aud,
				theme
				// enable_dark_theme,
				// user_limit
			})
		} catch (error) {
			console.log('ERROR Flag feature', error)
		}
	}

	// const config = new Configuration({
	//     basePath: KINDE_ISSUER_URL
	// })

	// const apiInstance = new UsersApi(config);

	// const headers = await getHeaders();

	// const users = await apiInstance.getUsers(undefined, {
	//     headers: {
	//         ...headers
	//     }
	// })
	// console.log('users', users);

	return {
		isAuthenticated,
		userProfile
	}
}
