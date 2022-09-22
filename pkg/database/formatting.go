package database

import "fmt"

func DatabaseParametersToDSN(engine string, host string, database string, user string, password string, ssl bool) string {
	// example: postgresql://localhost/mydb?user=other&password=secret
	var sslString string
	if ssl {
		sslString = "enable"
	} else {
		sslString = "disable"
	}
	return fmt.Sprintf("%s://%s:%s@%s/%s?sslmode=%s",
		engine, user, password, host, database, sslString)
}
