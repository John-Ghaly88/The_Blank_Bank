#!/bin/sh

rawurlencode() {
  local string="${1}"
  local strlen=${#string}
  local encoded=""
  local pos c o

  for (( pos=0 ; pos<strlen ; pos++ )); do
     c=${string:$pos:1}
     case "$c" in
        [-_.~a-zA-Z0-9] ) o="${c}" ;;
        * )               printf -v o '%%%02x' "'$c"
     esac
     encoded+="${o}"
  done
  echo "${encoded}"    # You can either set a return variable (FASTER) 
  REPLY="${encoded}"   #+or echo the result (EASIER)... or both... :p
}


getRequestJSON(){
  local json=$(jq -c . "${1}" )
  echo $json
  local url="${2}$(rawurlencode $json)"

  if [[ -z $3 ]] 
  then
    curl -s $url | jq '.'
  else
    curl -s $url | jq ${3}
  fi

}

getRequest(){
  local url="${1}"

  if [[ -z $2 ]] 
  then
    curl -s $url | jq '.'
  else
    curl -s $url | jq ${2}
  fi

}

postRequest(){
  local json=$(jq -c . "${1}" )
  local url="${2}"

    result=$(curl -X POST -vvv \
    -H "Content-Type: application/json" \
    -d "$json" $url)

  if [[ -z $3 ]] 
  then
    echo $result  | jq '.'
  else
    echo $result | jq ${3}
  fi


}


deleteRequest(){
  local json=$(jq -c . "${1}" )
  local url="${2}"
  echo $json

    result=$(curl -X DELETE \
    -H "Content-Type: application/json" \
    -d "$json" $url)

  if [[ -z $3 ]] 
  then
    echo $result | jq '.'
  else
    echo $result | jq ${3}
  fi

}

