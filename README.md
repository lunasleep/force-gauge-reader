### Connecting to the Mark-10 Force Gauge from a Mac ###

The Force Gauge uses a Silicon Labs USB to Serial Port converter. You need to install drivers.
I used [the silicon labs website](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers?tab=downloads)
There are drivers available on the Mark-10 website but they're five years older and wouldn't install on my Mac.

1. Install the drivers from the above website. You will have to right-click on the installer and select open to override the security control. During installation you'll have to go into System Preferences -> Security Settings to allow installation.
2. Once installation is complete, reboot the computer.
3. On the force gauge, go to menu -> usb settings -> baud rate and note the baud rate (I used 115200)
4. Under the data format setting, make sure "Numeric + Units" is selected.
5. On the Mac, run `ls /cu*`You should see `/dev/cu.SLAB_USBtoUART`
6. run `screen /dev/cu.SLAB.USBtoUART 115200` (or whatever baud rate the device is set to)
7. On the force gauge, press the data button, you should now see the reading.
8. Type ? and hit enter. You should see a reading.
9. Ctrl-A and then K to kill screen.

