var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
var welcomeMessage = "Go to bed server.";
var status = handler.FirstRun.status("https://github.com/Myxelium/go-to-bed/");
handler.MdsService.Start();

app.MapGet("/", () => Results.Text(welcomeMessage + "Status: " + status, "text/html"));

app.MapPost("/go-to-bed/sleep", () => handler.ShutdownCommand.Hibernate());

app.MapPost("/go-to-bed/shutdown", () => handler.ShutdownCommand.Shutdown());

app.MapPost("/go-to-bed/reboot", () => handler.ShutdownCommand.Reboot());

app.MapPost("/go-to-bed/logout", () => handler.ShutdownCommand.Logout());

app.MapPost("/go-to-bed/lock", () => handler.ShutdownCommand.Lock());


app.Run();