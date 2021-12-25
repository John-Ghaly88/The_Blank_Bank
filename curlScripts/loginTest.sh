#!/usr/bin/env bash
source ./httpMethods.sh;
#postRequest ./invalidLogin1.json 'http://localhost:3001/auth/login'
postRequest ./successfulLogin1.json 'http://localhost:3001/auth/login'
#postRequest ./nonExistentUser.json 'http://localhost:3001/auth/login'
