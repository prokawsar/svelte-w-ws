import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-sveltekit-sdk'
import type { RequestEvent } from '@sveltejs/kit'

export async function load({ request }: RequestEvent) {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	)
	let userProfile = null
	if (isAuthenticated) {
		// userProfile = await kindeAuthClient.getUser(request as unknown as SessionManager)
		userProfile = await kindeAuthClient.getUserProfile(request as unknown as SessionManager)
		// const userOrganizations = await kindeAuthClient.getUserOrganizations(
		// 	request as unknown as SessionManager
		// )
		const permission = await kindeAuthClient.getPermission(
			request as unknown as SessionManager,
			'read:profile'
		)
		const aud = await kindeAuthClient.getClaim(request as unknown as SessionManager, 'aud')
		const permissions = await kindeAuthClient.getPermissions(request as unknown as SessionManager)
		const getOrganization = await kindeAuthClient.getOrganization(
			request as unknown as SessionManager
		)
		const accessToken = await kindeAuthClient.getToken(request as unknown as SessionManager)
		const headers = {
			Accept: 'application/json',
			Authorization: `Bearer ${accessToken}`
		}

		// let url = `https://prokawsar.kinde.com/api/v1/organizations/org_3c1bc91bc0f/users`;
		let url = `https://prokawsar.kinde.com/api/v1/users`

		try {
			let orgName = await fetch(url, {
				method: 'GET',
				headers: headers
			})
				.then(function (res) {
					return res.json()
				})
				.then(function (body) {
					return body
				})
			console.log(url, orgName)
			const theme = await kindeAuthClient.getFlag(request as unknown as SessionManager, 'theme')
			const enable_dark_theme = await kindeAuthClient.getBooleanFlag(
				request as unknown as SessionManager,
				'is_dark_mode'
			)
			const user_limit = await kindeAuthClient.getIntegerFlag(
				request as unknown as SessionManager,
				'user_limit'
			)
			const app_version = await kindeAuthClient.getStringFlag(
				request as unknown as SessionManager,
				'app_version'
			)

			let logs = {
				userProfile,
				// userOrganizations,
				permission,
				permissions,
				getOrganization,
				// accessToken,
				aud,
				theme,
				enable_dark_theme,
				user_limit,
				app_version
			}

			console.log(logs)
		} catch (error) {
			console.log('ERROR Flag feature', error)
		}
	} else {
		console.log('No user logged in yet')
	}

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
