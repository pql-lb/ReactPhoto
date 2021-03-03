loadFbApi()
        .then(() => {
            let fire = checkLoginState.bind(this)
            fire()
            .then(async (response) => {
                // console.log('login state', response)
                let fire2 = statusChange.bind(this)
                fire2(response)
                .then(access => {
                    // console.log('a',access)
                    if (access) {
                    testAPI()
                    .then((res) => {
                        // console.log('res', res)
                        let id = res.data[0].id;
                        let access = res.data[0].access_token;
                        let name = res.data[0].name;
                        this.props.setName(name)
                        let businessId;
                        // console.log(id)
                        window.FB.api(`${id}?fields=instagram_business_account`, (res) => {
                        if (res) {
                            // console.log('id', id)
                            // window.FB.api(`${id}/picture`, (response) => {
                            //     // console.log('pp', response)
                            // })
                            businessId = res.instagram_business_account.id;
                            window.FB.api(`${businessId}/insights?metric=impressions,reach&period=week`, (response) => {
                                // console.log('impressions', response)
                                this.setState({
                                    impressions: response.data[0].values,
                                    reach: response.data[1].values
                                })
                            })
                            // window.FB.api(`${id}/picture`, {access_token: access}, (response) => {
                            //     console.log(response)
                            // })
                            window.FB.api(`${businessId}/media`, {access_token: access}, (response) => {
                                //console.log('photos', response.data)
                                let photos = new Array;
                                Promise.all(
                                response.data.map(x => {
                                    window.FB.api(`${x.id}?fields=media_url,like_count,comments,caption`, (data) => {
                                        //console.log('here', data)
                                        let url = data.media_url; let likes = data.like_count; let caption = data.caption;
                                        let obj = {url, likes}
                                        photos.push(obj)
                                    })
                                })
                                ).then(() => {
                                    this.props.setPhotos(photos); 
                                    this.setTimeout(() => {this.forceUpdate()}, 500)
                                    console.log('looking for', photos)
                                })  

                                let newId = response.data[0].id;
                                window.FB.api(`${newId}?fields=media_url`, {access_token: access}, (res) => {
                                    console.log('photo res', res)
                                    this.props.setAvatar(res.media_url)
                                })
                            })
                        }})
                        
                })
                .catch(err => console.log('err with test call', err))
            }})
            .catch(err => console.log('err with status change', err))
        })
        .catch(err => console.log('err with check login', err))
        })