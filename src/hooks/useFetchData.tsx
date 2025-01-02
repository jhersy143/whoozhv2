const fetchUser  = async () => {

    const response = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        query: `
       query {
              getPost{
                id
                content
                pros
                cons
                createdAt
                user {
                  id
                  firstname
                  lastname
                  email
                  avatar
                }
              }
            }
        `,
      }),
    });
   
    const result = await response.json();
  
    if (result.data) {
     return result.data.getPost;
    }
  };
  const countChoice  = async (postID:string,choice:string) => {

    const response = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        query: `
       query {
               countChoice(postID: "${postID}",choice:"${choice}")
            }
        `,
      }),
    });
   
    const result = await response.json();
 
    if (result.data) {
        return result.data.countChoice
    }
 
  };
  const countComment  = async (postID:string) => {

    const response = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        query: `
       query {
               countComment(postID: "${postID}")
            }
        `,
      }),
    });
   
    const result = await response.json();
   
    if (result.data) {
        return result.data.countComment
    }
 
  };
  const getPostByID  = async (postID:string) => {

    const response = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        query: `
       query {
               getPostByID(postID: "${postID}")
            }
        `,
      }),
    });
   
    const result = await response.json();
   
    if (result.data) {
        return result.data.countComment
    }
 
  };
  const TopPosts  = async () => {

    const response = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        query: `
       query {
               getTopPosts {
                    postID
                    count
                    content
                    pros
                    cons
                    createdAt
                    user{
                      firstname
                      lastname
                    }
                   
                  }
            }
        `,
      }),
    });
   
    const result = await response.json();
    console.log(result)
    if (result.data) {
        return result.data.getTopPosts
    }
 
  };
  const getcountJoined  = async (postID:string,userID:string) => {

    const response = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        query: `
       query {
               getPostByID(postID: "${postID}",userID: "${userID}") {
            }
        `,
      }),
    });
   
    const result = await response.json();
   
    if (result.data) {
        return result.data.countComment
    }
 
  };
  export {countChoice, fetchUser, countComment, TopPosts, getPostByID, getcountJoined}