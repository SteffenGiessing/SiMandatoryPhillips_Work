    # Read the CSV file
    # For each person in the CSV:
        # Generate a CPR in this format: ddMMyyy-[ranadom-4-digits]
        # Build an XML body that contains first name, last name and cpr number. see pdf for example
        # Send a POST request to  http://localhost:8080/nemID with the XML as a body
        
        # The NemID system will return a JSON body: { "nemID": "some 9 digit nemID"}
        
        # The system should create a msgpack file with the name[CPR].msgpack which will contain 
        # f_name, l_name, birth_date[DD-MM-YYYY], email, country, phone, address, CPR and NemID number. 
        # (I suggest you make a JSON object and then serialize it.)

import pandas as pd
import requests

# inheriting from object will allow for @classmethod decoration.
# this is advantageous when we want to access the class object and not instances of it
# in short class attributes will be affected in methods the same way as if we wrote type(self)
class LegacyCentralSystem(object):
    file_name = '/Users/phillipeismark/Documents/SystemIntegration/si_mandatory_assignment_1/Main_System/people.csv'    
    xmlFormat = """
    <?xml version="1.0"?>
        <Person>
            <FirstName>{}</FirstName>
            <LastName>{}</LastName>
            <cpr>{}</cpr>
        </Person>"""

# read file and create xml format
    @classmethod
    def read_csv(self):
        df = pd.read_csv(self.file_name)
        name, lastName, email, dateOfBirth, phone, address, country = "", "", "","","","",""
        for index,row in df.iterrows():
            name, lastName, cpr = str(row['FirstName']), str(row['LastName']), str(row['DateOfBirth'])
            xmlPerson = self.xmlFormat.format(name, lastName, cpr)
            print(xmlPerson)

    @classmethod
    def retrieve_nemId(xmlPerson):
        nemId = requests.post(xmlPerson)
        print(nemId)

if __name__ == "__main__":
    LegacyCentralSystem().read_csv()


