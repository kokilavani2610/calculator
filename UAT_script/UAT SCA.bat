@echo off
for /F "tokens=1,2" %%i in (proxy-user.txt) do node wellness.js runwellness UAT FULL_WELLNESS_V2SCA_Services %%i %%j chansri1@in.ibm.com
pause