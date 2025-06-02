import { handleErrorWithSentry } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	try {
		return await resolve(event);
	} catch (error) {
		// Handle DevalueError specifically
		if (error.message?.includes('Cannot stringify arbitrary non-POJOs')) {
			console.error('Serialization error:', error);
			// Return a more graceful error response
			return new Response('Error serializing data', { status: 500 });
		}
		throw error;
	}
};

/** @type {import('@sveltejs/kit').HandleError} */
export const handleError = async ({ error, event }) => {
	// Log the error
	console.error('Error:', error);

	// Return a more user-friendly error response
	return {
		message: 'An error occurred while processing your request',
		code: error?.code ?? 'UNKNOWN_ERROR'
	};
};
