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
    console.log(result)
    if (result.data) {
     return result.data.getPost;
    }
  };
  const countchoice  = async (postID:string,choice:string) => {

    const response = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        query: `
       query {
               countPros(postID: "${postID}",choice:"${choice}")
            }
        `,
      }),
    });
   
    const result = await response.json();
    console.log(result.data.countChoices)
    if (result.data) {
        return result.data.countChoices
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
    console.log(result.data.countComment)
    if (result.data) {
        return result.data.countComment
    }
 
  };
  export {countchoice, fetchUser, countComment}