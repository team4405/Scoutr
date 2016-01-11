angular.module('starter.services', [])

.factory('Teams',['$http',function($http){

        var teams = [];

        return {
            getAll:function(){
                return $http.get('https://scouter.firebaseio.com/teams.json',{
                });
            },
            getTeamuhk:function(teamNumber){
                for(i=0;i<teams.length;i++){
                  if(teams[i].id == teamNumber){
                    return teams[i];
                  }
                }
            },
            getTeams:function(){
                return $http.get('https://scouter.firebaseio.com/teams.json',{
                }).then(function(response){
                  teams = response;
                  return response;
                });
            },
            create:function(data){
                return $http.post('https://api.parse.com/1/classes/Families',data,{
                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                        'Content-Type':'application/json'
                    }
                });
            },
            edit:function(id,data){
                return $http.put('https://api.parse.com/1/classes/Families/'+id,data,{
                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                        'Content-Type':'application/json'
                    }
                });
            },
            delete:function(id){
                return $http.delete('https://api.parse.com/1/classes/Families/'+id,{
                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                        'Content-Type':'application/json'
                    }
                });
            }
        }
    }]);
