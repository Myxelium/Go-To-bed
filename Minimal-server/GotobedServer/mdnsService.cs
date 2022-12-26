using System.Net.NetworkInformation;
using Makaretu.Dns;

public class MdsService
{

    public void Start()
    {
        var macAddr = (
        from nic in NetworkInterface.GetAllNetworkInterfaces()
        where nic.OperationalStatus == OperationalStatus.Up
        select nic.GetPhysicalAddress().ToString()).FirstOrDefault();

        var sd = new ServiceDiscovery();
        var service = new ServiceProfile("x", "_foo._tcp", 1024);
        service.AddProperty("mac", macAddr);
        sd.Advertise(service);
    }
}
/*
var sd = new ServiceDiscovery();
var service = new ServiceProfile("x", "_foo._tcp", 1024);
service.AddProperty("mac", "bar");
sd.Advertise(service);


/*
var service = "...";
var mdns = new MulticastService();
mdns.QueryReceived += (s, e) =>
{
    var msg = e.Message;
    if (msg.Questions.Any(q => q.Name == service))
    {
        var res = msg.CreateResponse();
        var addresses = MulticastService.GetIPAddresses()
            .Where(ip => ip.AddressFamily == AddressFamily.InterNetwork);
        foreach (var address in addresses)
        {
            res.Answers.Add(new ARecord
            {
                Name = service,
                Address = address
            });
        }
        mdns.SendAnswer(res);
    }
};
mdns.Start();

*/