using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Api1.Controllers;

namespace Api1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
	    services.AddSingleton<LibraryManager>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = "https://msaleh22.usw1.kubesail.io/";
                    options.RequireHttpsMetadata = false;
                    options.Audience = "api1";
                    //options.TokenValidationParameters.ClockSkew = TimeSpan.Zero;
                });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.SetIsOriginAllowed(o => true).AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
//            if (env.IsDevelopment())
  //          {
                app.UseDeveloperExceptionPage();
    //        }

            app.UseCors("AllowSpecificOrigin");

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
