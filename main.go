package main

import (
    "database/sql"
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
    _ "github.com/mattn/go-sqlite3"
)

func main() {
    // Connect to SQLite3 (creates file if not exists)
    db, err := sql.Open("sqlite3", "./newsletter.db")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // Create table if not exists
    _, err = db.Exec(`CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE
    )`)
    if err != nil {
        log.Fatal(err)
    }

    router := gin.Default()
    router.Use(corsMiddleware())
   
    // Serve static files
    router.Static("/", ".")
   
    // Newsletter endpoint
    router.POST("/api/newsletter", func(c *gin.Context) {
    	var req struct {
    		Email string `json:"email"`
    	}
        if err := c.BindJSON(&req); err != nil || req.Email == "" {
            c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid email"})
            return
        }
        _, err := db.Exec("INSERT OR IGNORE INTO subscribers(email) VALUES(?)", req.Email)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"message": "Database error"})
            return
        }
        c.JSON(http.StatusOK, gin.H{"message": "Subscription successful!"})
    })

    router.Run(":8080")
}

// Allow CORS for local frontend
func corsMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }
        c.Next()
    }
}