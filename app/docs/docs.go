// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/api/v1/private/benches": {
            "post": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Benches"
                ],
                "summary": "Создание лавочки",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Bearer",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    },
                    {
                        "description": "Информация о лавочке",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/internal_adapters_primary_httpv1_private_bench.CreateBenchInput"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created",
                        "schema": {
                            "$ref": "#/definitions/internal_adapters_primary_httpv1_private_bench.BenchOutput"
                        }
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "418": {
                        "description": "I'm a teapot"
                    }
                }
            }
        },
        "/api/v1/public/users": {
            "post": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Users"
                ],
                "summary": "Регистрация пользователя",
                "parameters": [
                    {
                        "description": "Информация о пользователе",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/internal_adapters_primary_httpv1_public_user.CreateUserInput"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created",
                        "schema": {
                            "$ref": "#/definitions/internal_adapters_primary_httpv1_public_user.CredentialsOutput"
                        }
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "418": {
                        "description": "I'm a teapot"
                    }
                }
            }
        }
    },
    "definitions": {
        "internal_adapters_primary_httpv1_private_bench.BenchOutput": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "images": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "is_active": {
                    "type": "boolean"
                },
                "lat": {
                    "type": "number"
                },
                "lng": {
                    "type": "number"
                },
                "owner_id": {
                    "type": "string"
                },
                "street": {
                    "type": "string"
                }
            }
        },
        "internal_adapters_primary_httpv1_private_bench.CreateBenchInput": {
            "type": "object",
            "properties": {
                "images": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "lat": {
                    "type": "number"
                },
                "lng": {
                    "type": "number"
                },
                "street": {
                    "type": "string"
                }
            }
        },
        "internal_adapters_primary_httpv1_public_user.CreateUserInput": {
            "type": "object",
            "properties": {
                "auth_date": {
                    "type": "integer"
                },
                "first_name": {
                    "type": "string"
                },
                "hash": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "last_name": {
                    "type": "string"
                },
                "photo_url": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "internal_adapters_primary_httpv1_public_user.CredentialsOutput": {
            "type": "object",
            "properties": {
                "access_token": {
                    "type": "string"
                },
                "refresh_token": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "",
	Host:             "",
	BasePath:         "",
	Schemes:          []string{},
	Title:            "",
	Description:      "",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
