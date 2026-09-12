import { APIRequestContext } from "@playwright/test";
import { expect } from "@playwright/test";

type LoginResponse = {
  access_token: string;
};

export async function performApiLoginRequest(
    request: APIRequestContext,
    user: { email: string; password: string },
    ): Promise <LoginResponse> {
        const apiUrl = process.env.API_URL;
        if (!apiUrl) {
        throw new Error('API_URL environment variable is required to log in');
        }

        const response = await request.post(
        `${apiUrl}/users/login`,
        {
            data: {
            email: user.email,
            password: user.password,
            },
        },  
    );
    expect(response.ok()).toBeTruthy();
        const jsonData = (await response.json()) as LoginResponse;
        return jsonData;
}