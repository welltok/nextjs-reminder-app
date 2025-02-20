export function mockFetchUserApi() {
  return new Promise<{ name: string }>((resolve) => {
    setTimeout(() => resolve({ name: "John Doe" }), 500);
  });
}

export function mockFetchAuthApi() {
  return new Promise<{ token: string }>((resolve) => {
    setTimeout(() => resolve({ token: "test_token" }), 500);
  });
}