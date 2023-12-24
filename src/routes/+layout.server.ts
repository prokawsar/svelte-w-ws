import {
	getConfiguration,
	kindeAuthClient,
	UsersApi,
	type SessionManager,
	GrantType,
	OrganizationsApi,
	RolesApi
} from '@kinde-oss/kinde-auth-sveltekit'
import type { RequestEvent } from '@sveltejs/kit'

export async function load({ request }: RequestEvent) {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	)
	let userProfile = null
	if (isAuthenticated) {
		userProfile = await kindeAuthClient.getUserProfile(request as unknown as SessionManager)
		const userOrganizations = await kindeAuthClient.getUserOrganizations(
			request as unknown as SessionManager
		)
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
		let url = `https://prokawsar.kinde.com/api/v1/organization/?code=org_3c1bc91bc0f`
		// let url = `https://prokawsar.kinde.com/api/v1/users`
		try {
			// let resp = await fetch(url, {
			// 	method: 'GET',
			// 	headers: headers
			// })
			// let users = await resp.json()
			// console.log(users)
			const config = await getConfiguration()
			// User api
			const userApi = new UsersApi(config)
			const allUsers = await userApi.getUsers()
			// console.log(allUsers)
			// const createUser = await userApi.createUser({
			// 	createUserRequest: {
			// 		profile: {
			// 			familyName: 'Fromapi 2'
			// 		},
			// 		identities: [
			// 			{
			// 				details: {
			// 					email: 'fromapi2@gamil.com'
			// 				}
			// 			}
			// 		]
			// 	}
			// })

			// console.log(createUser)
			// Org api
			const orgApi = new OrganizationsApi(config)
			const orgs = await orgApi.getOrganization({
				code: 'org_54e63867a9d6'
			})
			const allOrg = await orgApi.getOrganizations()
			// console.log(orgs)
			// const createOrg = await orgApi.createOrganization({
			// 	createOrganizationRequest: {
			// 		name: 'create from api 3',
			// 		handle: 'api-org-4'
			// 	}
			// })
			// console.log(createOrg)

			// const delRes = await orgApi.deleteOrganization({
			// 	orgCode: createOrg.organization?.code || ''
			// })
			// console.log(delRes)

			// Roles api
			const roleInstance = new RolesApi(config)
			const allRoles = await roleInstance.getRoles()
			const role_id = allRoles?.roles && allRoles?.roles[0].id
			// console.log(allRoles)
			console.log('Role id: ', role_id)
			// const rolePermissions = await roleInstance.getRolePermission({
			// 	roleId: role_id || ''
			// })
			// console.log(rolePermissions)

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
				userOrganizations,
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

			// console.log(logs)
		} catch (error) {
			console.log('ERROR Flag feature', error)
		}
	} else {
		console.log('No user logged in yet')
	}

	return {
		isAuthenticated,
		userProfile
	}
}
