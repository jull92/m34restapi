test("shoudl check if server is listening on port", async () => {
    const response = await request.get("/health");
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe("Server is up")
});
