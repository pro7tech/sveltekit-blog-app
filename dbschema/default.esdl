module default {
  type Post extending HasTimestamp {
    required property title -> str; 
    required property slug -> str { constraint exclusive; }; 
    required property content -> str;
    property snippet -> str;
    required link author -> User;
    property image_src -> str;
    multi link tags -> Tag;
    multi link comments := .<post[is Comment]
  }

  type Comment extending HasTimestamp {
    required property content -> str;
    required link author -> User;
    required link post -> Post;
  }
  
  type Tag {
    required property name -> str { constraint exclusive; }
  }

  type User extending HasTimestamp {
    required property email -> str { constraint exclusive; };
    required property username -> str { constraint exclusive; };
    property first_name -> str;
    property last_name -> str;
    property password_hash -> str ;
    property user_auth_token -> str { constraint exclusive; };
    property avatar_src -> str;
    property full_name := .first_name ++ ' ' ++ .last_name;
    property role -> Role {
      default := 'user';
    }
  }

  abstract type HasTimestamp {
    required property created_at -> datetime {
      default := (datetime_current());
    }
  }

  scalar type Role extending enum <"admin", "user">;
}
