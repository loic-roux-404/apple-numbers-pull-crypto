use scripting additions
use framework "Foundation"

validate_sheet()

set coins to {}

-- retrieve the list of coins from number
tell application "Numbers"
	tell table 1 of sheet 1 of document 1
		set cntRow to count row
		set cntCol to count column
		
		repeat with curRow from 1 to cntRow
			if curRow mod 2 is not 0 then
				set tmpVal to value of cell curRow of column 1
				set the end of the coins to {|name|:tmpVal, price:null}
			end if
		end repeat --curRow
		
	end tell --document
end tell -- application

set coinsUrl to "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=57c7edd3-62c2-4172-9c9e-1ee3130f52b2&convert=USD&symbol="

-- get the value for each coin
repeat with coin in coins
	if (|name| of coin) is not missing value then
		set coinsUrl to coinsUrl & (|name| of coin) & ","
	end if
end repeat

tell application "JSON Helper"
	set response to fetch JSON from (text 1 thru -2 of coinsUrl)
end tell

set coinList to "error"

if error_message of status of response is missing value then
	set coinList to (|data| of response)
end if

if coinList is "error" then
	error "Impossible to fetch coins"
end if

repeat with coin in coins
	-- set price of coin to coinPrice
	set coinName to (|name| of coin)
	
	set pool to coinList
	set coinObj to coinName of coinList
	
	set coinPrice to 0
	set price of coin to coinPrice
end repeat

-- update values in numbers
tell application "Numbers"
	tell table 1 of sheet 1 of document 1
		set cntRow to count row
		set cntCol to count column
		
		repeat with curRow from 1 to cntRow
			set coinName to value of cell curRow of column 1
			
			repeat with coin in coins
				if |name| of coin is equal to coinName then
					if price of coin is not equal to "error" then
						set value of cell curRow of column 2 to price of coin
						set value of cell curRow of column 3 to (get current date)
					end if
				end if
			end repeat
		end repeat --curRow		
	end tell --document
end tell -- application

return

on validate_sheet()
	tell application "Numbers"
		if not (exists document 1) then error number 1000
		-- validate sheet
		set curSheet to sheet 1 of document 1
		set curSheetName to curSheet's name
		
		if curSheetName is not "Prices" then
			error "Incorrect Sheet: " & curSheetName
		end if
		
		-- validate table
		set curTable to first table of curSheet
		set curTableName to curTable's name
		
		if curTableName is not "Cryptos" then
			error "Incorrect Table: " & curTableName
		end if
		
	end tell
end validate_sheet