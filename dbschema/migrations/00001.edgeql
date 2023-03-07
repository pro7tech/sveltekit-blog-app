CREATE MIGRATION m1c7trqrp4kr7c5aasfw5ove3xss5xfd6cyu5l3s3wyn242kpd6k6q
    ONTO initial
{
  CREATE FUTURE nonrecursive_access_policies;
  CREATE ABSTRACT TYPE default::HasTimestamp {
      CREATE REQUIRED PROPERTY created_at -> std::datetime {
          SET default := (std::datetime_current());
      };
  };
  CREATE TYPE default::Comment EXTENDING default::HasTimestamp {
      CREATE REQUIRED PROPERTY content -> std::str;
  };
  CREATE SCALAR TYPE default::Role EXTENDING enum<admin, user>;
  CREATE TYPE default::User EXTENDING default::HasTimestamp {
      CREATE PROPERTY avatar_src -> std::str;
      CREATE REQUIRED PROPERTY email -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY first_name -> std::str;
      CREATE PROPERTY last_name -> std::str;
      CREATE PROPERTY full_name := (((.first_name ++ ' ') ++ .last_name));
      CREATE PROPERTY password_hash -> std::str;
      CREATE PROPERTY role -> default::Role {
          SET default := 'user';
      };
      CREATE PROPERTY user_auth_token -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY username -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Comment {
      CREATE REQUIRED LINK author -> default::User;
  };
  CREATE TYPE default::Tag {
      CREATE REQUIRED PROPERTY name -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE default::Post EXTENDING default::HasTimestamp {
      CREATE REQUIRED LINK author -> default::User;
      CREATE MULTI LINK tags -> default::Tag;
      CREATE REQUIRED PROPERTY content -> std::str;
      CREATE PROPERTY image_src -> std::str;
      CREATE REQUIRED PROPERTY slug -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY snippet -> std::str;
      CREATE REQUIRED PROPERTY title -> std::str;
  };
  ALTER TYPE default::Comment {
      CREATE REQUIRED LINK post -> default::Post;
  };
  ALTER TYPE default::Post {
      CREATE MULTI LINK comments := (.<post[IS default::Comment]);
  };
};
