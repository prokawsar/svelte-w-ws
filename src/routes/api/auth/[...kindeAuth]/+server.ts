import { handleAuth } from '@kinde-oss/kinde-sveltekit-sdk';

export function GET(requestEvents) {
	return handleAuth(requestEvents);
}
