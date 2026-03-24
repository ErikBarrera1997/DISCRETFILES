package com.api.usersservice.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Entitie class for user data
 */
@Document(collection = "users")
public class Entity_class_userMongo {

    @Id
    private String id;

    @Field("user_name")
    private String userName;

    private String email;
    private String password;

    public String getId() { 
    	return id; 
    }
    
    public void setId(String id) { 
    	this.id = id; 
    }

    public String getUserName() { 
    	return userName; 
    }
    
    public void setUserName(String userName) { 
    	this.userName = userName; 
    }

    public String getEmail() { 
    	return email; 
    }
    
    public void setEmail(String email) { 
    	this.email = email; 
    }

    public String getPassword() { 
    	return password; 
    }
    
    public void setPassword(String password) { 
    	this.password = password; 
    }
}
