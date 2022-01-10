#!/usr/bin/env bash
source ./httpMethods.sh;
#postRequest ./invalidLogin1.json 'http://localhost:3001/auth/login'
postRequest ./dto.json 'http://localhost:3001/external/transfer'
#postRequest ./nonExistentUser.json 'http://localhost:3001/auth/login'
