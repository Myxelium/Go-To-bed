using System.Diagnostics;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Runtime.InteropServices;
using Makaretu.Dns;
using Microsoft.Win32;

namespace handler
{
    public class MdsService
    {
        public static void Start()
        {
            var macAddress = (
                from networkInterface in NetworkInterface.GetAllNetworkInterfaces()
                where networkInterface.OperationalStatus == OperationalStatus.Up
                select networkInterface.GetPhysicalAddress().ToString()).FirstOrDefault();

            var addresses = MulticastService.GetIPAddresses()
                        .Where(ip => ip.AddressFamily == AddressFamily.InterNetwork).ToArray();

            //TODO find macadress and send it
            var serviceDiscovery = new ServiceDiscovery();
            var service = new ServiceProfile("GoToBed-Server", "_gotobed._tcp", 13378);
            service.AddProperty("mac", "macAddr");
            service.AddProperty("protocol", "http");
            service.AddProperty("ip", addresses[0].MapToIPv4().ToString());
            serviceDiscovery.Advertise(service);
        }
    }

    public class FirstRun
    {
        public static readonly string configPath = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData) + "/go-to-bed-server-first-run";

        public static void openGithubDocumentation(string uri)
        {
            Uri url = new Uri(uri);

            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                Process.Start(new ProcessStartInfo(url.AbsoluteUri) { UseShellExecute = true });
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                Process.Start("xdg-open", url.AbsoluteUri);
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            {
                Process.Start("open", url.AbsolutePath);
            }
            else
            {
                throw new Exception("Unsupported OS!");
            }
        }
        public static bool status(string documentationPath)
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                RegistryKey key = Registry.CurrentUser.OpenSubKey(@"Software\GoToBed", true);
                if (key == null)
                {
                    key = Registry.CurrentUser.CreateSubKey(@"Software\GoToBed");
                    key.SetValue("FirstRun", true);
                    openGithubDocumentation(documentationPath);
                    return true;
                }

                return false;
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                if (!File.Exists(configPath))
                {
                    File.Create(configPath);
                    openGithubDocumentation(documentationPath);
                    return true;
                }

                return false;
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            {
                if (!File.Exists(configPath))
                {
                    File.Create(configPath);
                    openGithubDocumentation(documentationPath);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                throw new Exception("Unsupported OS!");
            }
        }
    }

    public class ShutdownCommand
    {
        [DllImport("user32.dll")]
        private static extern bool ExitWindowsEx(uint uFlags, uint dwReason);

        // TODO: will clean only few are needed. Checked out what things does from documentation.
        private const uint EWX_LOGOFF = 0x00000000;
        private const uint EWX_SHUTDOWN = 0x00000001;
        private const uint EWX_REBOOT = 0x00000002;
        private const uint EWX_FORCE = 0x00000004;
        private const uint EWX_POWEROFF = 0x00000008;
        private const uint EWX_FORCEIFHUNG = 0x00000010;
        private const uint EWX_QUICKRESOLVE = 0x00000020;
        private const uint EWX_RESTARTAPPS = 0x00000040;
        private const uint EWX_HYBRID_SHUTDOWN = 0x00400000;
        private const uint EWX_BOOTOPTIONS = 0x01000000;

        private const uint SHTDN_REASON_MAJOR_OTHER = 0x00000000;
        private const uint SHTDN_REASON_MINOR_OTHER = 0x00000000;
        private const uint SHTDN_REASON_FLAG_PLANNED = 0x80000000;

        public static void Shutdown()
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                ExitWindowsEx(EWX_SHUTDOWN | EWX_FORCE, SHTDN_REASON_MAJOR_OTHER | SHTDN_REASON_MINOR_OTHER | SHTDN_REASON_FLAG_PLANNED);
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                Process.Start("shutdown", "-h now");
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            {
                Process.Start("shutdown", "-h now");
            }
            else
            {
                throw new Exception("Unsupported OS!");
            }
        }

        public static void Hibernate()
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                ExitWindowsEx(EWX_HYBRID_SHUTDOWN | EWX_FORCE, SHTDN_REASON_MAJOR_OTHER | SHTDN_REASON_MINOR_OTHER | SHTDN_REASON_FLAG_PLANNED);
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                Process.Start("systemctl", "suspend");
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            {
                Process.Start("pmset", "sleepnow");
            }
            else
            {
                throw new Exception("Unsupported OS!");
            }
        }

        public static void Abort()
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                ExitWindowsEx(EWX_FORCEIFHUNG | EWX_FORCE, SHTDN_REASON_MAJOR_OTHER | SHTDN_REASON_MINOR_OTHER | SHTDN_REASON_FLAG_PLANNED);
            }
            else
            {
                throw new Exception("Unsupported OS!");
            }
        }

        public static void Reboot()
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                ExitWindowsEx(EWX_REBOOT | EWX_FORCE, SHTDN_REASON_MAJOR_OTHER | SHTDN_REASON_MINOR_OTHER | SHTDN_REASON_FLAG_PLANNED);
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                Process.Start("shutdown", "-r now");
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            {
                Process.Start("shutdown", "-r now");
            }
            else
            {
                throw new Exception("Unsupported OS!");
            }
        }
        public static void Logout()
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                ExitWindowsEx(EWX_LOGOFF | EWX_FORCE, SHTDN_REASON_MAJOR_OTHER | SHTDN_REASON_MINOR_OTHER | SHTDN_REASON_FLAG_PLANNED);
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                Process.Start("shutdown", "-l now");
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            {
                Process.Start("shutdown", "-l now");
            }
            else
            {
                throw new Exception("Unsupported OS!");
            }
        }

        public static void Lock()
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                Process.Start("rundll32.exe", "user32.dll,LockWorkStation");
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                Process.Start("gnome-screensaver-command", "-l");
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            {
                Process.Start("pmset", "displaysleepnow");
            }
            else
            {
                throw new Exception("Unsupported OS!");
            }
        }
    }
}