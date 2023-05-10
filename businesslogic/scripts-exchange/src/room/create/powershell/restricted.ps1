        
$mail = "room-dk-kb601-23d3@nexigroup.com"
$restrictedTo =  "christina.missel@nexigroup.com" 
write-host "Processing" $mail
Set-Mailbox $mail  -MailTip "This room has restrictions on who can book it"
Set-CalendarProcessing $mail  -DeleteComments $false -AutomateProcessing AutoAccept -AllRequestInPolicy $false  -AllBookInPolicy $false -BookInPolicy $restrictedTo -BookingWindowInDays 601 -ResourceDelegates $null       
   