// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

using System.Collections.Generic;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;

namespace Server
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> Ids =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };


        public static IEnumerable<ApiResource> Apis =>
            new[]
            {
                new ApiResource("api1")
                {
                    UserClaims =
                    {
                        JwtClaimTypes.Profile
                    }
                }
            };


        public static IEnumerable<Client> Clients =>
            new[]
            {
                new Client
                {
                    ClientId = "mvc",
                    ClientName = "MVC Client",

                    AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                    RequirePkce = false,
                    ClientSecrets = { new Secret("49C1A7E1-0C79-4A89-A3D6-A37998FB86B0".Sha256()) },

                    RedirectUris = { "http://mohammadakbari.c1.kubesail.io/signin-oidc" },
                    FrontChannelLogoutUri = "http://mohammadakbari.c1.kubesail.io/signout-oidc",
                    PostLogoutRedirectUris = { "http://mohammadakbari.c1.kubesail.io/signout-callback-oidc" },
		    RequireConsent = false,

                    AllowOfflineAccess = true,
                    AllowedScopes = { "openid", "profile" }
                },
new Client
                {
                    ClientId = "58bdb6b3dd264200a118657123",
                    ClientName = "spa2",
                    ClientUri = "https://yasinj64.usw1.kubesail.io",

                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    RequireClientSecret = false,
                    RequireConsent = false,
                    AllowOfflineAccess = true,

                    RedirectUris =
                    {
                        "https://yasinj64.usw1.kubesail.io/",
                        "https://yasinj64.usw1.kubesail.io/signin-callback.html",
                        "https://yasinj64.usw1.kubesail.io/silent_callback.html"
                    },

                    PostLogoutRedirectUris = { "https://yasinj64.usw1.kubesail.io" },
                    AllowedCorsOrigins = { "https://yasinj64.usw1.kubesail.io" },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
			IdentityServerConstants.StandardScopes.OfflineAccess,
                        "api1"
                    },
                    AccessTokenLifetime = 3 * 60
                },
            };
    }
}
