/*
                           href
 -----------------------------------------------------------------
                            host              path
                      --------------- ----------------------------
http://user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash
 -----  ---------  --------   ---- -------- ------------- -----
protocol     auth  hostname   port pathname  search|query     hash


node½âÎö£º
		   url.parse(string).query
                                           |
           url.parse(string).pathname      |
                       |                   |
                     ------ -------------------
http://localhost:8888/start?foo=bar&hello=world
                                ---       -----
                                 |          |
              querystring.parse(queryString)["foo"]    |
                                            |
                         querystring.parse(queryString)["hello"]
*/